import {
    ProteinReasonNotApplied,
    ProteinReasonLowBadScore,
    ProteinReasonHighGoodStuffScore,
    ProteinReasonIsCheese,
    ProteinReasonIsRedMeat
} from '@/libs/tables'


const DisplayNames = {
    kJ: 'kJ',
    kcal: 'Calories',
    sugar: 'Sugar',
    satFats: 'Saturated Fat',
    totalFats: 'Fat (total)',
    ratioSatFats: 'Percentage of Saturated Fats',
    sodium: 'Sodium',
    salt: 'Salt',
    protein: 'Protein',
    fiber: 'Fiber',
    goodStuff: 'Vegetables, fruit, nuts',
    cheese: 'Cheese',
    general: 'Solid Foods',
    fats: 'Nuts & Fats',
    drinks: 'Drinks',
    redmeat: 'Red Meat',
    cheesePlaceholder: 'a cheese',
    generalPlaceholder: 'a solid food',
    fatsPlaceholder: 'a nut or fat',
    drinksPlaceholder: 'a drink',
    redmeatPlaceholder: 'red meat',
    name: 'name',
    letterScore: 'Total Score',
    share: 'Share result',


    heading: 'Nutri Score Calculator',
    calculate_now: 'Calculate now',
    calculate_score: 'Calculate Score',

    last_updated: 'Last updated',
    sources_used: 'Sources used',

    calculate: 'Calculate',
    calculate_for: 'Calculate for ',
    negative_inputs: 'Negative Ingredients',
    positive_inputs: 'Positive Ingredients',
    result_for: 'Result for',
    category: 'Category',

    score: 'Score',
    distribution_points: 'Distribution of Points',
    points: 'Points',
    explanation: 'Explanation',
    details: 'Details',
    score_limits: 'Score/Scale',
    higher_is: 'more is',
    better: 'better',
    worse: 'worse',
    show_limits: 'Show Scale',
    hide_limits: 'Hide Scale',
    score_limits_info: 'This scale shows the limits for the different scores',
    tendency: 'Trend',
    tendency_info: 'This diagram shows the tendency of the score. The assignment of points is done step by step. Therefore, it is shown here whether the value tends to the better or worse score.',

    diff_from_points: 'diff away from points',
    bordering_on: 'bordering on points',

    share_result: 'Share Result',
    calculate_new: 'Calculate another Score',

    badge_explanation: `The "superscript" means the value of this ingredient is near the direction and tendency score.`,
    better_dat: 'better',
    worse_dat: 'worse',
    higher_dat: 'higher',
    lower_dat: 'lower',
    not_counted: 'not counted',

    actions: 'Actions',

    de: 'german',
    en: 'english',

    imprint: 'Contact',
    privacy: 'Privacy',

    enterName: "Enter a name for this food",
    per100: "per 100g/100ml"
}
const ProteinAppliedDisplayNames = new Map([
    [ProteinReasonNotApplied, 'because it is not a cheese, the number of negative points is greater than 11 and the product consists of less than 80% fruit,vegetables or nuts'],
    [ProteinReasonLowBadScore, 'because the number of negative points is less than 11 points'],
    [ProteinReasonHighGoodStuffScore, 'because the negative sum is greater than 11 points, but the product consists of more than 80% fruit, vegetables or nuts'],
    [ProteinReasonIsCheese, 'because the protein content of cheese is always included'],
    [ProteinReasonIsRedMeat, 'however, the protein content of red meat is set at 2 points maximum']
]);


const InfoTexts = {
    kJ: 'Beschreibt die Energie eines Lebensmittels und wird negativ gewertet.',
    drinks: 'Here the Nutri-Score can be calculated for beverages such as teas, lemonades and juices. Dairy drinks are not calculated here, but via the "Dairy products" category. The Nutri-Score for water is an exception: it is always A. Water is the only beverage that can achieve the score A.',
    cheese: 'Here the Nutri-Score can be calculated for cheese. Cream and butter are calculated with the category "Fats". Quark is not calculated here but in the "Solid Foods" tab',
    fats: 'Here the Nutri-Score can be calculated for foods with high fat content like cream, oils or butter. This also includes nuts, processed nuts, ground nuts and seeds. Note that chestnuts are not included.',
    general: 'The "General" or "Solid Foods" category is used to calculate the Nutri-Score for solid foods. There are separate calculation types for dairy products, fats and beverages.',
    redmeat: 'Here the Nutri-Score can be calculated for red meat products. The following products are seen as red meat: beef, veal, swine and lamb, though they include also game/venison, horse, donkey, goat, camel and kangaroo.'
}

const InputInfoTexts = {
    kJ: 'Der Energiegehalt des Lebensmittels',
    goodStuff: 'Umfasst Obst, Gemüse, Hülsenfüchte, Vollkorn'
}

const AvailableModalInfos = {
    salt: true,
    fiber: true,
    goodStuff: true
}

const CurrentLocale = 'en';
export {
    InfoTexts,
    ProteinAppliedDisplayNames,
    DisplayNames,
    InputInfoTexts,
    CurrentLocale,
    AvailableModalInfos
};