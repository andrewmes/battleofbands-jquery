
var bandList = [];

var nextBandId = 1000;

function Band(
    bandName,
    leadSinger,
    genre,
    homeState,
    yearsAsABand,
    spotify,
    phoneNumber,
    canText
) {
    this.id = nextBandId++;
    this.bandName = bandName;
    this.leadSinger = leadSinger;
    this.genre = genre;
    this.homeState = homeState;
    this.yearsAsABand = yearsAsABand;
    this.spotify = spotify;
    this.phoneNumber = phoneNumber;
    this.canText = canText;

    this.sortableName = function () {
        return this.lastName + ", " + this.firstName;
    }
};

function modelCreateBand(
    bandName,
    leadSinger,
    genre,
    homeState,
    yearsAsABand,
    spotify,
    phoneNumber,
    canText)
{
    var newBand = new Band(bandName, leadSinger, genre, homeState, yearsAsABand, spotify, phoneNumber, canText);
    bandList.push(newBand);
    return newBand;
};

function modelGetAllBands() {
    return bandList;
};

function modelGetBand(id) {
    for (x in bandList) {
        if (bandList[x].id === id) {
            return bandList[x];
        }
    }

    return undefined;
}

function modelUpdateBand(id, bandName, leadSinger, genre, homeState, yearsAsABand, spotify, phoneNumber, canText) {
    var band = modelGetBand(id);
    if (!band) {
        return undefined;
    }

        band.bandName = bandName;
        band.leadSinger = leadSinger;
        band.genre = genre;
        band.homeState = homeState;
        band.yearsAsABand = yearsAsABand;
        band.spotify = spotify;
        band.phoneNumber = phoneNumber;
        band.canText = canText;
    
        return band;
}

function modelDeleteBand(id) {
    for (var x in bandList)
    {
        if (bandList[x].id === id)
        {
            bandList.splice(x, 1);
            return;
        }
    }
}

 