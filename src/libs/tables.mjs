function getResult(value, row, representativeSpan, lowest=0) {
    let fractal = null
    let upper = row[1]
    let lower = (row[0] === -Infinity) ? lowest : row[0]
    let relativeValue = value - lower

    let diff = representativeSpan;
    if (upper !== Infinity) {
        diff = upper - lower
    }

    fractal = calculateFractal(relativeValue, diff)

    return {
        value,
        fractal,
        points: row[2]
    }
}

function calculateFractal(relativeValue, diff) {
    let fractal = relativeValue / diff
    return (fractal < 1) ? fractal : 1;
}

function getPoints(scale, value, lowest=0) {
    let representativeSpanRow = scale[scale.length - 2]
    let representativeSpan = representativeSpanRow[1] - representativeSpanRow[0]
    for (const row of scale) {
        if (row.length === 3) {
            if (value > row[0] && value <= row[1]) {
                return getResult(value, row, representativeSpan, lowest)
            }
        }
        if (row.length === 2) {
            if (value < row[0]) {
                return row[1]
            }
        }
    }
    console.log(scale, value)
    return null;
}

function saltToSodium(salt) {
    return salt * 1000 / 2.5;
}
const ProteinReasonNotApplied = 0;
const ProteinReasonLowBadScore = 1;
const ProteinReasonHighGoodStuffScore = 2;
const ProteinReasonIsCheese = 3;
const ProteinReasonIsRedMeat = 4;

function getApplyProtein(badScore, goodStuffValue) {
    let applyProtein = (badScore < 11 || (badScore >= 11 && goodStuffValue.value >= 80));
    let reason = ProteinReasonNotApplied
    if (applyProtein) {
        reason = (badScore < 11) ? ProteinReasonLowBadScore : ProteinReasonHighGoodStuffScore;
    }
    return {
        applyProtein,
        reason
    };
}

const PropModes = {
    BOTH: 0,
    ONLY_INPUT: 1,
    ONLY_OUTPUT: 2
}

function Prop(scale, mode = PropModes.BOTH) {
    this.scale = scale;
    this.mode = mode;
}

const StdKj = new Prop([
    [-Infinity, 335, 0],
    [335, 670, 1],
    [670, 1005, 2],
    [1005, 1340, 3],
    [1340, 1675, 4],
    [1675, 2010, 5],
    [2010, 2345, 6],
    [2345, 2680, 7],
    [2680, 3015, 8],
    [3015, 3350, 9],
    [3350, Infinity, 10],
]);
const StdSugar = new Prop([
    [-Infinity, 3.4, 0],
    [3.4, 6.8, 1],
    [6.8, 10, 2],
    [10, 14, 3],
    [14, 17, 4],
    [17, 20, 5],
    [20, 24, 6],
    [24, 27, 7],
    [27, 31, 8],
    [31, 34, 9],
    [34, 37, 10],
    [37, 41, 11],
    [41, 44, 12],
    [44, 48, 13],
    [48, 51, 14],
    [51, Infinity, 15],
]);

const StdSatFats = new Prop([
    [-Infinity, 1, 0],
    [1, 2, 1],
    [2, 3, 2],
    [3, 4, 3],
    [4, 5, 4],
    [5, 6, 5],
    [6, 7, 6],
    [7, 8, 7],
    [8, 9, 8],
    [9, 10, 9],
    [10, Infinity, 10],
]);
const StdSodium = new Prop([
    [-Infinity, 80, 0],
    [80, 160, 1],
    [160, 240, 2],
    [240, 320, 3],
    [320, 400, 4],
    [400, 480, 5],
    [480, 560, 6],
    [560, 640, 7],
    [640, 720, 8],
    [720, 800, 9],
    [800, 880, 10],
    [880, 960, 11],
    [960, 1040, 12],
    [1040, 1120, 13],
    [1120, 1200, 14],
    [1200, 1280, 15],
    [1280, 1360, 16],
    [1360, 1440, 17],
    [1440, 1520, 18],
    [1520, 1600, 19],
    [1600, Infinity, 20],
], PropModes.ONLY_OUTPUT)

const StdSalt = new Prop(null, PropModes.ONLY_INPUT)

const StdProtein = new Prop([
    [-Infinity, 2.4, 0],
    [2.4, 4.8, 1],
    [4.8, 7.2, 2],
    [7.2, 9.6, 3],
    [9.6, 12, 4],
    [12, 14, 5],
    [14, 17, 6],
    [17, Infinity, 7],
])

const StdFiber = new Prop([
    [-Infinity, 3.0, 0],
    [3.0, 4.1, 1],
    [4.1, 5.2, 2],
    [5.2, 6.3, 3],
    [6.3, 7.4, 4],
    [7.4, Infinity, 5],
])

const StdGoodStuff = new Prop([
    [-Infinity, 40, 0],
    [40, 60, 1],
    [60, 80, 2],
    [80, Infinity, 5],
])

const StdPointsToScore = [
    [-Infinity, 0, 'A'],
    [0, 2, 'B'],
    [2, 10, 'C'],
    [10, 18, 'D'],
    [18, Infinity, 'E']
];

class Table {
    static nutriprops = {
        n: {
            kJ: StdKj,
            sugar: StdSugar,
            satFats: StdSatFats,
            sodium: StdSodium,
            salt: StdSalt
        },
        p: {
            protein: StdProtein,
            fiber: StdFiber,
            goodStuff: StdGoodStuff
        }
    };

    static pointsToScore = StdPointsToScore;

    static computedprops = {};

    static getInputNames(obj) {
        return Object.entries(obj).filter(([, prop]) => prop.mode === PropModes.BOTH ||
             prop.mode === PropModes.ONLY_INPUT)
    }

    static negativeInputs() {
        return this.getInputNames(this.nutriprops.n)
    }

    static positiveInputs() {
        return this.getInputNames(this.nutriprops.p)
    }

    static getBadValues(nutriInfo) {
        return {
            kjValue: getPoints(this.nutriprops.n.kJ.scale, nutriInfo.kJ),
            sugarValue: getPoints(this.nutriprops.n.sugar.scale, nutriInfo.sugar),
            satFatsValue: getPoints(this.nutriprops.n.satFats.scale, nutriInfo.satFats),
            sodiumValue: getPoints(this.nutriprops.n.sodium.scale, saltToSodium(nutriInfo.salt)),
        }
    }

    static getGoodValues(nutriInfo) {
        return {
            protValue: getPoints(this.nutriprops.p.protein.scale, nutriInfo.protein),
            fiberValue: getPoints(this.nutriprops.p.fiber.scale, nutriInfo.fiber),
            goodStuffValue: getPoints(this.nutriprops.p.goodStuff.scale, nutriInfo.goodStuff),
        }
    }

}


class GeneralTable extends Table {
    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, sodiumValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const pCalc = getApplyProtein(badScore, goodStuffValue);

        let totalScore = badScore - goodStuffValue.points - fiberValue.points;

        if (pCalc.applyProtein) {
            totalScore -= protValue.points
        }

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}

class RedMeatTable extends Table {
    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, sodiumValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const pCalc = getApplyProtein(badScore, goodStuffValue);

        let totalScore = badScore - goodStuffValue.points - fiberValue.points;

        protValue.points = Math.min(protValue.points, 2);

        if (pCalc.applyProtein) {
            totalScore -= protValue.points;
        }

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: ProteinReasonIsRedMeat,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}

class CheeseTable extends Table {
    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, sodiumValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const goodScore = protValue.points + goodStuffValue.points + fiberValue.points
        const totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: true,
            proteinAppliedReason: ProteinReasonIsCheese,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}

class FatsTable extends Table {
    static nutriprops = {
        n: {
            sugar: StdSugar,
            satFats: StdSatFats,
            sodium: StdSodium,
            totalFats: new Prop(null, PropModes.ONLY_INPUT),
            salt: StdSalt,
            ratioSatFats: new Prop([
                [-Infinity, 9.99, 0],
                [9.99, 15.99, 1],
                [15.99, 21.99, 2],
                [21.99, 27.99, 3],
                [27.99, 33.99, 4],
                [33.99, 39.99, 5],
                [39.99, 45.99, 6],
                [45.99, 51.99, 7],
                [51.99, 57.99, 8],
                [57.99, 63.99, 9],
                [63.99, Infinity, 10]
            ], PropModes.ONLY_OUTPUT)
        },
        p: {
            protein: StdProtein,
            fiber: StdFiber,
            goodStuff: StdGoodStuff
        }
    };

    static computedprops = {
        n: {
            kJ: new Prop([
            [-Infinity, 120, 0],
            [120, 240, 1],
            [240, 360, 2],
            [360, 480, 3],
            [480, 600, 4],
            [600, 720, 5],
            [720, 840, 6],
            [840, 960, 7],
            [960, 1080, 8],
            [1080, 1200, 9],
            [1200, Infinity, 10],
            ])
        }
    }

    static pointsToScore = [
        [-Infinity, -6, 'A'],
        [-6, 2, 'B'],
        [2, 10, 'C'],
        [10, 18, 'D'],
        [18, Infinity, 'E']
    ];

    static getBadValues(nutriInfo) {
        const ratio = nutriInfo.satFats / nutriInfo.totalFats * 100
        return {
            kjValue: getPoints(this.computedprops.n.kJ.scale, (nutriInfo.satFats / 100) * 37),
            sugarValue: getPoints(this.nutriprops.n.sugar.scale, nutriInfo.sugar),
            ratioValue: getPoints(this.nutriprops.n.ratioSatFats.scale, ratio),
            sodiumValue: getPoints(this.nutriprops.n.sodium.scale, saltToSodium(nutriInfo.salt)),
        }
    }

    static calculateScore(data) {
        const {kjValue, sugarValue, ratioValue, sodiumValue} = this.getBadValues(data)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(data)

        const badScore = kjValue.points + sugarValue.points + ratioValue.points + sodiumValue.points;

        const pCalc = getApplyProtein(badScore, goodStuffValue)
        const goodScore = goodStuffValue.points + fiberValue.points + ((pCalc.applyProtein) ? protValue.points : 0)

        let totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['ratioSatFats', ratioValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}


class DrinksTable extends Table {
    static nutriprops = {
        n: {
            kJ: new Prop([
                [-Infinity, 0, 0],
                [0, 30, 1],
                [30, 60, 2],
                [60, 90, 3],
                [90, 120, 4],
                [120, 150, 5],
                [150, 180, 6],
                [180, 210, 7],
                [210, 240, 8],
                [240, 270, 9],
                [270, Infinity, 10],
            ]),
            sugar: new Prop([
                [-Infinity, 0, 0],
                [0, 1.5, 1],
                [1.5, 3, 2],
                [3, 4.5, 3],
                [4.5, 6, 4],
                [6, 7.5, 5],
                [7.5, 9, 6],
                [9, 10.5, 7],
                [10.5, 12, 8],
                [12, 13.5, 9],
                [13.5, Infinity, 10]

            ]),
            salt: StdSalt,
            satFats: StdSatFats,
            sodium: StdSodium,
        },
        p: {
            protein: StdProtein,
            fiber: StdFiber,
            goodStuff: new Prop([
                [-Infinity, 40, 0],
                [40, 60, 2],
                [60, 80, 4],
                [80, Infinity, 10],
            ])
        }
    };
    static pointsToScore = [
        [-Infinity, -Infinity, 'A'],
        [-Infinity, 2, 'B'],
        [3, 5, 'C'],
        [5, 9, 'D'],
        [9, Infinity, 'E']
    ];

    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, sodiumValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)


        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const pCalc = getApplyProtein(badScore, goodStuffValue)
        const goodScore = goodStuffValue.points + fiberValue.points + ((pCalc.applyProtein) ? protValue.points : 0)

        const totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -20, )
        }
    }
}

function getUnit(nutriProp) {
    switch (nutriProp) {
        case 'kJ':
            return 'kJ'
        case 'sodium':
            return 'mg'
        case 'ratioSatFats':
            return '%'
        case 'letterScore':
            return 'P'
        default:
            return 'g'
    }
}

function WasPropUsedInCalculation(propName, result) {
    return (propName !== 'protein' || result.applyProtein)
}

export {
    GeneralTable,
    FatsTable,
    DrinksTable,
    CheeseTable,
    RedMeatTable,
    getUnit,
    ProteinReasonIsCheese,
    ProteinReasonNotApplied,
    ProteinReasonLowBadScore,
    ProteinReasonHighGoodStuffScore,
    ProteinReasonIsRedMeat,
    WasPropUsedInCalculation,
    getPoints,
    Prop
};