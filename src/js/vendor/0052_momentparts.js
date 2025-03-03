function updateMomentPartsData() {
  var mom = moment();
  
  var alphabetPart = ['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h','i','i','j','j','k','k','l','l','m','m','n','n','o','o','p','p','q','q','r','r','s','s','t','t','u','u','v','v','w','w','x','x','y','y','z','z'];
  
  window.data.momentParts = {
    seconds: mom.format("ss"),
    minutes: mom.format("mm"),
    minutesTens: Math.floor(mom.format("mm") / 10 % 10),
    minutesOnes: Math.floor(mom.format("mm") % 10),
    hours12: mom.format("h"),
    hours24: mom.format("H"),
    hours24Padded: mom.format("HH"),
    hours12WithColon: mom.format("h:"),
    hours12Tens: Math.floor(mom.format("h") / 10 % 10),
    hours12Ones: Math.floor(mom.format("h") % 10),
    hours24Tens: Math.floor(mom.format("H") / 10 % 10),
    hours24Ones: Math.floor(mom.format("H") % 10),
    dayOfYear: mom.format("DDD"),
    dayOfMonth: mom.format("D"),
    weekdayTwo: mom.format("dd"),
    weekday: mom.format("ddd"),
    weekdayUpperCase: mom.format("ddd").toUpperCase(),
    weekdayThree: mom.format("ddd"),
    weekdayFull: mom.format("dddd"),
    weekNumber: mom.format("w"),
    weekAlphabetPart: alphabetPart[mom.format("w") - 1],
    month: mom.format("MMM"),
    dateUpperCase: mom.format("MMM").toUpperCase() + ' ' + mom.format("D"),
    monthThree: mom.format("MMM"),
    monthFull: mom.format("MMMM"),
    moonPhase: SunCalc.getMoonPhase(new Date(),.01)
  }
}

