//  We take advantage on knowing we can only be working with an item at a time
var currentItemID = '';
var imageToDelete = '';
//  This variable is used to make the 3-state checkbox with which we show all items, those we got, or those we haven't got yet
var hideGotState = 2; //  0 = all, 1 = to get, 2 = got

//  Arrays for grouping filter button IDs
const weaponFilters = ['swordFilter', 'bowFilter', 'daggerFilter', 'staffFilter', 'wandFilter', 'katanaFilter'];
const abilityFilters = ['cloakFilter', 'poisonFilter', 'prismFilter', 'quiverFilter', 'trapFilter', 'starFilter', 'spellFilter', 'skullFilter', 'orbFilter', 'tomeFilter', 'scepterFilter', 'helmFilter', 'shieldFilter', 'sealFilter', 'wakizashiFilter', 'luteFilter'];
const armorFilters = ['leatherarmorFilter', 'robeFilter', 'heavyarmorFilter'];

//  Array in which we will create multiple instances of the drop sound, so we can play it multiple times at once
var dropSound = new Array();
var nextSound = 0;

//  Base url for the realmeye wiki, used for linking the items
const wikiURL = 'https://www.realmeye.com/wiki/';

//  JSON Array containing all items, I generate it automatically with a python script and the info avaliable in realmeye.com
const items = JSON.parse('{"Abomination\'s Wrath": ["weapon", "orange", "wand"], "Acidic Armor": ["armor", "orange", "leatherarmor"], "Acidic Slasher": ["reskin", "weapon", "white", "sword"], "Akuma\'s Tear": ["orange", "ring"], "Alien Core: Corrosion": ["orange", "ring"], "Alien Core: Dark Matter": ["orange", "ring"], "Alien Core: Power": ["orange", "ring"], "Alien Core: Warp": ["orange", "ring"], "Almandine Armor of Anger": ["reskin", "armor", "orange", "heavyarmor"], "Almandine Ring of Wrath": ["reskin", "orange", "ring"], "Amulet of Drakefyre": ["orange", "ring"], "Anatis Staff": ["weapon", "white", "staff"], "Ancient Spell: Pierce": ["ability", "orange", "spell"], "Ancient Stone Sword": ["weapon", "white", "sword"], "Anointed Robe": ["armor", "orange", "robe"], "Apiary Armor": ["armor", "orange", "leatherarmor"], "Apocalypse Feather": ["weapon", "white", "sword"], "Arbiter\'s Wrath": ["weapon", "white", "katana"], "Archerang": ["ability", "white", "quiver"], "Arctic Bow": ["reskin", "weapon", "white", "bow"], "Armor of Nil": ["armor", "white", "leatherarmor"], "Bergenia Bow": ["weapon", "orange", "bow"], "Blade of Ages": ["weapon", "white", "katana"], "Blazon Bow": ["reskin", "weapon", "white", "bow"], "Bloodshed Ring": ["white", "ring"], "Bloodstone Ring": ["orange", "ring"], "Blue Beehemoth Quiver": ["reskin", "ability", "white", "quiver"], "Book of Geb": ["ability", "orange", "tome"], "Botany Book": ["reskin", "ability", "white", "tome"], "Bottled Medusozoan": ["ability", "white", "poison"], "Bow of the Morning Star": ["reskin", "weapon", "white", "bow"], "Bow of the Void": ["weapon", "white", "bow"], "Bracer of the Guardian": ["white", "ring"], "Brain of the Golem": ["ability", "orange", "prism"], "Breastplate of New Life": ["armor", "white", "heavyarmor"], "Brilliance Bow": ["weapon", "orange", "bow"], "Butter Bow": ["weapon", "white", "bow"], "Caduceus of Current Craziness": ["weapon", "white", "wand"], "Candy-Coated Armor": ["armor", "white", "heavyarmor"], "Carved Golem Remains": ["weapon", "orange", "dagger"], "Cave Dweller Trap": ["ability", "white", "trap"], "Celestial Blade": ["weapon", "white", "katana"], "Ceremonial Merlot": ["ability", "orange", "tome"], "Challenger Helm": ["ability", "white", "helm"], "Champion\'s Bastion": ["ability", "orange", "shield"], "Cheater Heavy Armor": ["armor", "white", "heavyarmor"], "Cheater Light Armor": ["armor", "white", "leatherarmor"], "Cheater Robe": ["armor", "white", "robe"], "Chicken Leg of Doom": ["weapon", "white", "dagger"], "Chrysanthemum Corsage": ["orange", "ring"], "Cloak of Bloody Surprises": ["ability", "white", "cloak"], "Cloak of Refraction": ["ability", "white", "cloak"], "Cloak of the Mad God": ["ability", "white", "cloak"], "Cloak of the Planewalker": ["ability", "white", "cloak"], "Clover Bow": ["weapon", "white", "bow"], "Clover Star": ["ability", "white", "star"], "Cnidaria Rod": ["ability", "white", "scepter"], "Comet of Calamity": ["reskin", "weapon", "white", "staff"], "Conducting Wand": ["weapon", "white", "wand"], "Coral Bow": ["weapon", "white", "bow"], "Coral Venom Trap": ["ability", "white", "trap"], "Corrosion Cutter": ["reskin", "weapon", "white", "dagger"], "Corruption Cutter": ["weapon", "white", "dagger"], "Crystal Shield": ["ability", "white", "shield"], "Crystal Sword": ["weapon", "white", "sword"], "Crystal Wand": ["weapon", "white", "wand"], "Crystalline Kunai": ["ability", "orange", "star"], "Crystallised Fang\'s Venom": ["ability", "white", "poison"], "Crystallised Mist": ["white", "ring"], "Daybreak Chakram": ["ability", "orange", "star"], "Deathless Crossbow": ["weapon", "orange", "bow"], "Demon Blade": ["weapon", "white", "sword"], "Dirk of Cronus": ["weapon", "white", "dagger"], "Doctor Swordsworth": ["weapon", "white", "sword"], "Doku No Ken": ["weapon", "white", "katana"], "Doom Bow": ["weapon", "white", "bow"], "Dueling Daggers": ["reskin", "weapon", "white", "dagger"], "Echoes Prism": ["ability", "white", "prism"], "Edictum Praetoris": ["weapon", "orange", "staff"], "Enchanted Ice Blade": ["reskin", "weapon", "white", "sword"], "Enchanted Ice Shard": ["reskin", "white", "ring"], "Enchantment Orb": ["ability", "white", "orb"], "Epiphany Skull": ["ability", "white", "skull"], "Esben\'s Shaman Attire": ["armor", "white", "robe"], "Esben\'s Wedding Ring": ["white", "ring"], "Eternal Snowflake Wand": ["reskin", "weapon", "white", "wand"], "Etherite Dagger": ["weapon", "orange", "dagger"], "Fairy Plate": ["armor", "orange", "heavyarmor"], "Fire Blade": ["reskin", "weapon", "white", "katana"], "Fire Dragon Battle Armor": ["armor", "white", "heavyarmor"], "First Mate\'s Hook": ["orange", "ring"], "Fitted Protective Matrix": ["armor", "white", "leatherarmor"], "Fool\'s Prism": ["ability", "white", "prism"], "Foramite Staff": ["reskin", "weapon", "white", "staff"], "Fractured Gemstone Wakizashi": ["ability", "white", "wakizashi"], "Frimarra": ["reskin", "white", "ring"], "Frozen Wand": ["reskin", "weapon", "white", "wand"], "Fungal Breastplate": ["armor", "white", "heavyarmor"], "Garment of the Beast": ["armor", "orange", "robe"], "Gaseous Glaive": ["reskin", "weapon", "white", "sword"], "Geb\'s Ring of Wisdom": ["orange", "ring"], "Gem of Adoration": ["white", "ring"], "Gem of Tenderness": ["white", "ring"], "Ghastly Drape": ["ability", "orange", "cloak"], "Ghostly Prism": ["ability", "white", "prism"], "Golem Garments": ["armor", "orange", "leatherarmor"], "Greaterhosen": ["armor", "white", "leatherarmor"], "Grotesque Scepter": ["ability", "orange", "scepter"], "Hanagasaku": ["ability", "white", "star"], "Harlequin Armor": ["armor", "white", "leatherarmor"], "Heart of Gold Prism": ["ability", "white", "prism"], "Heavenly Magatama": ["orange", "ring"], "Heavy Protective Matrix": ["armor", "white", "heavyarmor"], "Helium Trap": ["ability", "white", "trap"], "Helm of Draconic Dominance": ["ability", "orange", "helm"], "Helm of the Jack-o\'-naut": ["reskin", "ability", "white", "helm"], "Helm of the Juggernaut": ["ability", "white", "helm"], "Helm of the Swift Bunny": ["ability", "white", "helm"], "Hirejou Tenne": ["armor", "orange", "leatherarmor"], "Hivemaster Helm": ["ability", "white", "helm"], "Hivemind Circlet": ["orange", "ring"], "Hollyhock Hide": ["armor", "orange", "leatherarmor"], "Honey Circlet": ["orange", "ring"], "Honey Scepter Supreme": ["ability", "white", "scepter"], "Honeytomb Snare": ["ability", "orange", "trap"], "Horrific Claws": ["orange", "ring"], "Ice Crown": ["reskin", "white", "ring"], "Indomptable": ["weapon", "orange", "sword"], "Interregnum": ["orange", "ring"], "Jade Storm": ["ability", "white", "spell"], "K.I.D.D. Force": ["weapon", "white", "staff"], "Kageboshi": ["ability", "white", "star"], "Kamishimo": ["armor", "orange", "heavyarmor"], "Karma Orb": ["ability", "white", "orb"], "Katana of Good Fortune": ["weapon", "white", "katana"], "Kazekiri": ["weapon", "orange", "katana"], "Keychain Cutlass": ["weapon", "white", "sword"], "KoalaPOW": ["weapon", "white", "staff"], "Krathana": ["weapon", "white", "katana"], "Leaf Bow": ["weapon", "white", "bow"], "Leaf Dragon Hide Armor": ["armor", "white", "leatherarmor"], "Lifebringing Lotus": ["ability", "orange", "trap"], "Lightning in a Bottle": ["ability", "white", "poison"], "Locked Reactor": ["orange", "ring"], "Luminous Armor": ["armor", "orange", "leatherarmor"], "Luxurious Leather": ["armor", "orange", "leatherarmor"], "MMace MMurderer": ["weapon", "white", "sword"], "Magic Protective Matrix": ["armor", "white", "robe"], "Magical Lodestone": ["white", "ring"], "Mantle of Skuld": ["armor", "orange", "leatherarmor"], "Marble Seal": ["ability", "white", "seal"], "Memento Mori": ["ability", "orange", "skull"], "Mercy\'s Bane": ["armor", "orange", "heavyarmor"], "Midnight Star": ["ability", "white", "star"], "Mighty Stein": ["ability", "white", "poison"], "Mimicry Trap": ["ability", "white", "trap"], "Mirror Cloak": ["ability", "white", "cloak"], "Mister Mango": ["weapon", "white", "dagger"], "Molten Mantle": ["armor", "orange", "robe"], "Moonbeam Blade": ["reskin", "weapon", "white", "katana"], "Murky Toxin": ["ability", "white", "poison"], "NSFWakizashi": ["ability", "white", "wakizashi"], "Naval Uniform": ["armor", "orange", "heavyarmor"], "Necronomicon": ["ability", "white", "tome"], "Nectar Crossfire": ["weapon", "orange", "bow"], "Omni-Impotence Ring": ["orange", "ring"], "Omnipotence Ring": ["white", "ring"], "Onyx Shield of the Mad God": ["ability", "orange", "shield"], "Orb of Aether": ["ability", "white", "orb"], "Orb of Conflict": ["ability", "white", "orb"], "Orb of Terror": ["reskin", "ability", "white", "orb"], "Oryx\'s Greatsword": ["weapon", "orange", "sword"], "Painbow": ["ability", "white", "trap"], "Parasitic Concoction": ["ability", "orange", "poison"], "Penetrating Blast Spell": ["ability", "white", "spell"], "Perennial Cranium": ["ability", "white", "skull"], "Pernicious Peridot": ["orange", "ring"], "Phantasm Dirk": ["reskin", "weapon", "white", "dagger"], "Pirate King\'s Cutlass": ["weapon", "white", "sword"], "Pixie-Enchanted Sword": ["weapon", "orange", "sword"], "Plague Poison": ["ability", "white", "poison"], "Prism of Dancing Swords": ["ability", "white", "prism"], "Prism of Dire Instability": ["ability", "white", "prism"], "Prismatic Slasher": ["weapon", "white", "dagger"], "Prismimic": ["ability", "white", "prism"], "Quartz Cutter": ["weapon", "orange", "katana"], "Queen\'s Stinger Dagger": ["weapon", "white", "dagger"], "Quintessential Quiver": ["ability", "orange", "quiver"], "Quiver of Shrieking Specters": ["ability", "orange", "quiver"], "Quiver of Thunder": ["ability", "white", "quiver"], "Quiver of the Shadows": ["ability", "white", "quiver"], "Radiant Heart": ["orange", "ring"], "Rags of the Host": ["armor", "orange", "leatherarmor"], "Rainbow Rod": ["weapon", "white", "wand"], "Random Spell Extraction Device": ["ability", "white", "spell"], "Ray Katana": ["weapon", "white", "katana"], "Recurring Terror Spell": ["ability", "white", "spell"], "Red Beehemoth Quiver": ["reskin", "ability", "white", "quiver"], "Regal Ring": ["orange", "ring"], "Reikoku": ["weapon", "orange", "katana"], "Resurrected Warrior\'s Armor": ["ability", "white", "heavyarmor"], "Revenant Ring": ["orange", "ring"], "Ring of Pagan Favor": ["orange", "ring"], "Ring of Pure Wishes": ["orange", "ring"], "Ring of the Covetous Heart": ["orange", "ring"], "Ring of the Inferno": ["orange", "ring"], "Ring of the Nile": ["white", "ring"], "Ring of the Northern Light": ["reskin", "white", "ring"], "Ring of the Pyramid": ["white", "ring"], "Ring of the Sphinx": ["white", "ring"], "Ritual Robe": ["armor", "white", "robe"], "Robe of the Mad Scientist": ["armor", "white", "robe"], "Robobow": ["weapon", "white", "bow"], "Rusty Cuffs": ["orange", "ring"], "Ryu\'s Blade": ["ability", "orange", "wakizashi"], "Sakura Wakizashi": ["reskin", "ability", "white", "wakizashi"], "Scepter of Devastation": ["ability", "white", "scepter"], "Scepter of Fulmination": ["ability", "white", "scepter"], "Scholar\'s Seal": ["ability", "white", "seal"], "Scorchium Stone": ["ability", "orange", "orb"], "Seal of Blasphemous Prayer": ["ability", "white", "seal"], "Seal of Eternal Life": ["ability", "white", "seal"], "Seal of the Enchanted Forest": ["ability", "orange", "seal"], "Sealed Crystal Skull": ["ability", "white", "skull"], "Sentient Staff": ["weapon", "orange", "staff"], "Shendyt of Geb": ["armor", "orange", "robe"], "Shield of Flowing Clarity": ["ability", "white", "shield"], "Shield of Ogmur": ["ability", "white", "shield"], "Shield of Pogmur": ["ability", "white", "shield"], "Silex\'s Hammer": ["weapon", "white", "sword"], "Skull of Corrupted Souls": ["ability", "white", "skull"], "Skull of Endless Torment": ["ability", "white", "skull"], "Skullish Remains of Esben": ["ability", "white", "skull"], "Snowblind Wand": ["reskin", "weapon", "white", "wand"], "Soul of the Bearer": ["ability", "orange", "orb"], "Soul\'s Guidance": ["weapon", "white", "wand"], "Soulless Robe": ["armor", "orange", "robe"], "Sourcestone": ["white", "ring"], "Spectral Ring of Horrors": ["orange", "ring"], "Spelling Spell": ["ability", "white", "spell"], "Spicy Wand of Spice": ["weapon", "white", "wand"], "Spirit Dagger": ["weapon", "white", "dagger"], "Spirit Staff": ["weapon", "white", "staff"], "Spiteful Scutum": ["ability", "white", "shield"], "Sporous Spray Spell": ["ability", "white", "spell"], "Staff of Eruption": ["weapon", "orange", "staff"], "Staff of Esben": ["weapon", "white", "staff"], "Staff of Extreme Prejudice": ["weapon", "white", "staff"], "Staff of Iceblast": ["reskin", "weapon", "white", "staff"], "Staff of Unholy Sacrifice": ["weapon", "white", "staff"], "Staff of the Saint": ["weapon", "white", "staff"], "Star of Enlightenment": ["ability", "white", "star"], "Sun\'s Judgement": ["reskin", "weapon", "white", "bow"], "Sunny Side Bow": ["reskin", "weapon", "white", "bow"], "Sunshine Shiv": ["weapon", "white", "dagger"], "Swashbuckler\'s Sickle": ["weapon", "orange", "sword"], "Sword of Illumination": ["reskin", "weapon", "white", "sword"], "Sword of the Colossus": ["weapon", "white", "sword"], "Sword of the Mad God": ["reskin", "weapon", "orange", "sword"], "Sword of the Rainbow\'s End": ["weapon", "white", "sword"], "Symbiotic Ripper": ["weapon", "orange", "dagger"], "Tablet of the King\'s Avatar": ["ability", "white", "spell"], "Tezcacoatl\'s Tail": ["weapon", "white", "staff"], "The Forgotten Crown": ["white", "ring"], "The Forgotten Ring": ["orange", "ring"], "The Phylactery": ["weapon", "orange", "staff"], "The Robe of Twilight": ["armor", "orange", "robe"], "The Twilight Gemstone": ["white", "ring"], "Theurgy Wand": ["weapon", "orange", "wand"], "Thousand Shot": ["weapon", "white", "bow"], "Toga Picta": ["armor", "orange", "robe"], "Tome of Frigid Protection": ["reskin", "ability", "white", "tome"], "Tome of Holy Furor": ["ability", "white", "tome"], "Tome of Holy Protection": ["ability", "white", "tome"], "Tome of Moral Support": ["ability", "white", "tome"], "Tome of Pain": ["ability", "white", "tome"], "Tome of Purification": ["ability", "white", "tome"], "Tome of the Mushroom Tribes": ["ability", "white", "tome"], "Toxin Tooth": ["weapon", "orange", "dagger"], "Trap of the Blood Spirit": ["reskin", "ability", "white", "trap"], "Trap of the Vile Spirit": ["ability", "white", "trap"], "Tricorne of the High Seas": ["ability", "orange", "helm"], "Unshuriken": ["ability", "white", "star"], "Useless Katana": ["weapon", "white", "katana"], "Virulent Venom": ["ability", "orange", "poison"], "Vitamine Buster": ["ability", "white", "spell"], "Void Blade": ["weapon", "white", "katana"], "Wakizashi Of Eastern Winds": ["ability", "white", "wakizashi"], "Wakizashi of Crossing Fires": ["ability", "white", "wakizashi"], "Wand of Geb": ["weapon", "orange", "wand"], "Wand of the Bulwark": ["weapon", "white", "wand"], "Wand of the Fallen": ["weapon", "white", "wand"], "Warlord Wand": ["reskin", "weapon", "white", "wand"], "Water Dragon Silk Robe": ["armor", "white", "robe"], "Wraith\'s Brigandine": ["armor", "orange", "leatherarmor"], "Yellow Beehemoth Quiver": ["reskin", "ability", "white", "quiver"], "Zaarvox\'s Heart": ["armor", "orange", "heavyarmor"], "Snake Charmer Pungi": ["ability", "lute", "white"], "Wavecrest Concertina": ["ability", "lute", "white"], "Pharaoh\'s Requiem": ["ability", "lute", "white"]}');

//  With this function we generate the containers (cards) of the items in the grid and fill the itemGrid with them
function fillItemGrid() {
    gridContent = '';

    //  We need to define the Object.entries function because IE is retarded
    if (!Object.entries)
        Object.entries = function( obj ){
            var ownProps = Object.keys( obj ),
                i = ownProps.length,
                resArray = new Array(i); // preallocate the Array
            while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
            return resArray;
        };

    for (let [actualItem, attributesArray] of Object.entries(items)) {
        attributes = '';
        // THIS IS NECCESSARY, OTHERWISE ITEMS WITH ' IN THEIR NAME WILL MESS UP THE JS FUNCTION CALLS, cannot be done on the JSON array or parser kills himself
        itemNameEscaped = actualItem.replace('\'', '\\\'');
        for(var i = 0, len = attributesArray.length; i < len; i++) {
            attributes += ' ' + attributesArray[i];
        }
        //  The url for the item pages in Realmeye follows this pattern
        itemNameInWikiURL = wikiURL + actualItem.replace(/\. /g, '-').replace(/\'-/g, '-').replace(/\./g, '-').replace(/: /g, '-').replace(/ /g, '-').replace(/\'/g, '-');
        //  This is the template for the card of every item, we will store all content in a string
        gridContent += `
<div class="itemContainer col mb-4 mx-3 colitem ${attributes}" id="${actualItem}Card">
    <div class="itemContainer card" style="background-color: #486581;">
        <a href="${itemNameInWikiURL}" class="mt-3">
            <img src="resources/items/${actualItem}.png" style="display:block;margin:auto;height:40px;width:40px;" alt="Image" /></a>
        <h2 class="itemName mb-0" style="text-align:center;">${actualItem}</h2>
        <div class="card-body">
            <div class="row align-items-end">
                <div class="mx-auto mt-1" style="width:48px; height:48px;">
                    <input class="img-fluid" type="image" src="resources/${getBagType(actualItem)}.png" style="outline:none;height:48px;width:48px;" oncontextmenu="return clickCounterSubstract(\'${itemNameEscaped}\')" onclick="clickCounter(\'${itemNameEscaped}\')" alt="Image"/></div>
                <h1 class="mb-0 pb-0" onclick="clickCounterSubstract(\'${itemNameEscaped}\')" style="text-align:center;" id="${actualItem}"></h1>
                <div class="mx-auto pl-1">
                    <button data-toggle="modal" data-target="#exampleModalCenter" data-itemid="${actualItem}" type="button" id="button${actualItem}" class="btn btn-primary">
                    <img src="resources/cameraIcon.svg" style="width:20px;"/></button></div></div></div></div></div>`;
    }
    document.getElementById('itemGrid').innerHTML = gridContent;
}

//  This function returns the type of bag which contains the item of itemID
function getBagType(itemID) {
    target = [];
    for (let [actualItem, attributesArray] of Object.entries(items)) {
        if(actualItem == itemID) {
            target = attributesArray;
            break;
        }
    }
    if(target.includes('orange'))
        return 'orangebag';
    return 'whitebag';
}

//  Adds one to the counter of the itemID item (in localStorage) or sets it to 0 if it wasn't defined
function clickCounter(itemID) {
    dropSound[nextSound].play();
    nextSound = (nextSound + 1) % dropSound.length;
    if (typeof(Storage) !== "undefined") {
        if (localStorage[itemID])
            localStorage[itemID] = Number(localStorage[itemID])+1;
        else
            localStorage[itemID] = 1;
        document.getElementById(itemID).innerHTML = localStorage[itemID];
    }
    //  Enabling the 'screenshots' button if counter is > 1
    document.getElementById("button" + itemID).disabled = false;
}

//  Substracs one of the counter of the itemID item (in localStorage). Min is 0.
function clickCounterSubstract(itemID) {
    if (typeof(Storage) !== "undefined") {
        if (localStorage[itemID] && localStorage[itemID] > 0)
            localStorage[itemID] = Number(localStorage[itemID])-1;
        else
            localStorage[itemID] = 0;
        document.getElementById(itemID).innerHTML = localStorage[itemID];
    }
    //  If counter is 0 we disable 'screenshots' button
    if(localStorage[itemID] == 0)
        document.getElementById("button" + itemID).disabled = true;
    return false;
}

//  Loads the counter of every item from localStorage (or 0 if not defined) and set that number on the counter container
function loadItemCount() {
    for (let [actualItem, attributesArray] of Object.entries(items)) {
        if (localStorage[actualItem] == 'undefined' || localStorage[actualItem] == null)
            localStorage[actualItem] = 0;
        document.getElementById(actualItem).innerHTML = localStorage[actualItem];
        
        if(localStorage[actualItem] == 0)
            document.getElementById("button" + actualItem).disabled = true;
        else
            document.getElementById("button" + actualItem).disabled = false;
    }
}

//  Sets the content of the screenshotList modal, filling it with miniatures of the screenshots of that item and one extra which acts as an 'addScreenshot' button
function displayScreenshots() {
    modalContent = '';
    array = JSON.parse(localStorage.getItem(currentItemID+'photos'));
    if(array != 'undefined' && Array.isArray(array) && array.length > 0)
        array.forEach(element => {
            modalContent = modalContent + '<div class="col mb-4"><div class="card"><input oncontextmenu="return showConfirmScreenshotDeleteModal(\'' + element + '\')" class="card-img-top" type="image" data-toggle="modal" data-target="#realSizeImageModal" data-imageurl="' + element + '" type="button" src="' + element + '" alt="Image"/></div></div>'  
        });
    modalContent = modalContent + '<div class="col mb-4"><div class="card"><input data-toggle="modal" data-target="#addScreenshotModal" class="card-img-top" type="image" type="button" onClick="" src="resources/addImage.png" alt="Image"/></div></div>';
    document.getElementById('screenshotList').innerHTML = modalContent;
}

//  Shows the modal which asks the user to confirm the delete of the screeshot
function showConfirmScreenshotDeleteModal(imageUrl) {
    imageToDelete = imageUrl;
    $('#confirmScreenshotDeleteModal').modal('show');
    return false;
}

//  Call when confirming or canceling delete, on confirm will delete, on cancel will hide the confrmScreenshotDeleteModal
function deleteScreenshot(decision) {
    if(decision) {
        array = JSON.parse(localStorage.getItem(currentItemID+'photos'));
        array.splice(array.indexOf(imageToDelete), 1);
        localStorage.setItem(currentItemID+'photos', JSON.stringify(array));
        displayScreenshots();
    }
    $('#confirmScreenshotDeleteModal').modal('hide');
}

//  Adds a screenshot to the current item screenshots array (in localStorage) and displays the changes
function addScreenshot(modalID) {
    array = JSON.parse(localStorage.getItem(currentItemID+'photos'));
    if(array == 'undefined' || !Array.isArray(array))
        array = [];
    if(!array.includes(document.getElementById('addUrl').value)) {
        array.push(document.getElementById('addUrl').value);
        localStorage.setItem(currentItemID + 'photos', JSON.stringify(array));
        displayScreenshots();
    }
    //  After adding, it will hide his own modal
    $(modalID).modal('hide');
    return false;
}

//  This function hides the caller modal, used to hide on click inside screenshot
//to make experience better with huge screenshots
function closeModal(modalID){
    $(modalID).modal('hide');
}

//  The filtering is honestly a mess, this is the function every regular checkbox calls onClick
function clickFilter(filterID) {
    //  If it's being checked, we assume the user want to activate the filter
    if (document.getElementById(filterID).checked) {    //THE CHECKBOX IS BEING ACTIVATED
        //  These are special buttons/filters we use to activate or deactivate every other filter in it's group
        if(filterID == 'weaponFilter') {
            weaponFilters.forEach(element => {if(!document.getElementById(element).checked) clickFilterNoApply(element);});
        } else if(filterID == 'abilityFilter') {
            abilityFilters.forEach(element => {if(!document.getElementById(element).checked) clickFilterNoApply(element);});
        } else if(filterID == 'armorFilter') {
            armorFilters.forEach(element => {if(!document.getElementById(element).checked) clickFilterNoApply(element);});
        }
    } else {
        //  These are special buttons/filters we use to activate or deactivate every other filter in it's group
        if(filterID == 'weaponFilter') {
            weaponFilters.forEach(element => {if(document.getElementById(element).checked) clickFilterNoApply(element);});
        } else if(filterID == 'abilityFilter') {
            abilityFilters.forEach(element => {if(document.getElementById(element).checked) clickFilterNoApply(element);});
        } else if(filterID == 'armorFilter') {
            armorFilters.forEach(element => {if(document.getElementById(element).checked) clickFilterNoApply(element);});
        }
    }
    //  * NOW THAT WE CHANGED THE FILTER VALUES WE APPLY THEM *
    applyFilters();
}

//  This function is just for performance. Explanation here: clickFilter applies every filter when it ends, but clicks on some of the
//  general filters apply that function (clickFilter) on every other filter in that group, for which we would have to apply filters n*n when we could just do it at the end (n)
function clickFilterNoApply(filterID) {
    document.getElementById(filterID).checked = !document.getElementById(filterID).checked;
}

//  Applies all the filters in a fixed way, changing the order would mess up everything (depends)
function applyFilters() {
    //  * Posible Upgrade * create array with the display value for each item so we dont have to apply until the end
    //  First we hide every item
    changeDisplay('colitem', 'none');

    //  If no filter is activated we will show all items (for now)
    var anyFilterOn = false;
    //  Now, we show all the items for which the users is interested
    weaponFilters.forEach(element => {
        if(document.getElementById(element).checked) {
            changeDisplay(element.replace('Filter', ''), 'block');
            anyFilterOn = true;
        }
    });
    abilityFilters.forEach(element => {
        if(document.getElementById(element).checked) {
            changeDisplay(element.replace('Filter', ''), 'block');
            anyFilterOn = true;
        }
    });
    armorFilters.forEach(element => {
        if(document.getElementById(element).checked) {
            changeDisplay(element.replace('Filter', ''), 'block');
            anyFilterOn = true;
        }
    });
    if(document.getElementById('ringFilter').checked) {
        changeDisplay('ring', 'block');
        anyFilterOn = true;
    }
    //  Here we fix it if no filters were activated
    if(!anyFilterOn) changeDisplay('colitem', 'block');

    //  The user wants to see only whitebag items? maybe only orangebag items? both? from the selected ones we remove the unwanted
    if(!document.getElementById('whitebagFilter').checked) changeDisplay('white', 'none');
    if(!document.getElementById('orangebagFilter').checked) changeDisplay('orange', 'none');

    //  At the end, we hide the items the user got, those which he hasn't got yet, or none, depending on the gotFilter config
    hideGot();
}

//  We set the display of each item to 'display' value if his card contains the 'targetClass' class
function changeDisplay(targetClass, display) {
    targetContainers = document.getElementsByClassName(targetClass);
    for(var i = 0; i < targetContainers.length; i++){
        targetContainers[i].style.display = display;
    }
}

//  Function to search for an item using a search bar, it will hide non-matching and show items even if hideen by filters
function searchItem() {
    var keyword, ul, i;
    keyword = document.getElementById('searchBar').value.toLocaleLowerCase();
    //  This just makes the function faster
    if(keyword == '') {
        applyFilters();
        return;
    }
    //  We use the containers with this class to do the search, as inside we have the item name
    ul = document.getElementsByClassName('itemName');

    // Loop through all list items, and hide those who don't match the search keyword
    for (i = 0; i < ul.length; i++) {
        itemName = ul[i].innerHTML.toLocaleLowerCase();
        displayValue = 'block'
        //  We filter by inclusion of the search parameter
        if(!itemName.includes(keyword))
            displayValue = 'none';
        ul[i].parentElement.parentElement.style.display = displayValue;
    }
}

//  We separate the onClick function of the functionality because we need to be able to access the
// functionality (this function) without changing the click state or appearance
function clickOnHideGot() {
    //  Go to the next of the 3 states
    hideGotState = (hideGotState + 1) % 3;
    switch (hideGotState) {
        case 0:
            document.getElementById('hideGotText').innerHTML = 'All';            
            break;
        case 1:
            document.getElementById('hideGotText').innerHTML = 'To Get';
            break;
        case 2:
            document.getElementById('hideGotText').innerHTML = 'Got';
            break;
        default:
            break;
    }
    //  Change appearance
    if (hideGotState == 0) {    //WE SHOW ALL SO THE BUTTON IS DEACTIVATED
        document.getElementById('gotFilter').parentElement.style.backgroundColor = '#BCCCDC';
        document.getElementById('gotFilter').parentElement.style.boxShadow = '';
    } else {
        document.getElementById('gotFilter').parentElement.style.backgroundColor = '#486581';
        document.getElementById('gotFilter').parentElement.style.boxShadow = '0 0 0 0.1rem rgb(130, 138, 145,.5)';
    }
    //  Applying the filters and changing the hideGotState will be enough
    applyFilters();
}

//  We separate the onClick function of the functionality because we need to be able to access the
// functionality (this function) without changing the click state or appearance
//  WE UPDATE THE COMPLETION RATE IN THIS FUNCTION TO GET BETTER EFFICIENCE
function hideGot() {
    totalItems = 0
    showingItems = 0
    currentItem = null
    for (let [actualItem, attributesArray] of Object.entries(items)) {
        contadorActual = parseInt(document.getElementById(actualItem).innerHTML);
        currentItem = document.getElementById(actualItem + 'Card')

        //  For each item we go through and BEFORE changing the display, we get the data for the completion rate
        if(currentItem.style.display != 'none') {
            if(contadorActual > 0)
                showingItems++;
            totalItems++;
        }

        //  We will not set any display to 'block' because this filter works in a different way than the regular ones
        if((hideGotState == 1 && contadorActual > 0)||(hideGotState == 2 && contadorActual < 1)) {
            currentItem.style.display = 'none';
        }
    }
    //  Now that we have finished going through all items and taking note of them, we update the completion rate
    document.getElementById("completionRate").innerHTML = showingItems + '/' + totalItems + " (" + ((showingItems / totalItems)*100).toFixed(2) + "%)"
}

//  Function to create a sound and define it's play and stop functions
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){

        this.sound.pause();
    }
}

//  Exports the localStorage data as JSON and prompts the user for downloading it
function exportData() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(localStorage)));
    element.setAttribute('download', 'RotmgChecklistData.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

//  This function overrides the localStorage data with a file selected from the user
function importData(input) {
    file = input.files[0];
    //  First we create a FileReader and an event onload to read the file when its uploaded
    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        //  Before applying changes we ask the user for confirmation
        if(!confirm("Are you sure you want to override your actual checklist? This cannot be undone, you might want to export it before!"))
            return;
        // when the reader is done, the content is in reader.result.
        var newData = JSON.parse(reader.result);
        //  We clear the old data before setting the new one
        localStorage.clear();
        for (let [key, value] of Object.entries(newData)) {
            localStorage.setItem(key, value);
        }
        //  We reload the page to make sure that changes are displayed 
        window.location.replace("index.html");
    };
    reader.readAsText(input.files[0]);
}

//  We ask for confimation from the user and if we get it, we clear the entire localStorage data
function clearData() {
    if(confirm("Are you sure you want to fully clear your checklist from this browser? This cannot be undone, you might want to export it before!")) {
        localStorage.clear();
        window.location.replace("index.html");
    }
}