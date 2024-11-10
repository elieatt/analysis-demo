const lodash = require("lodash");
const moment = require("moment");
const extendMoment = require("moment-range").extendMoment;

const momentRange = extendMoment(moment);

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed molestie nisi, nec bibendum lorem. Curabitur augue est, varius nec enim et, tristique laoreet sem. Nullam in lacus quis odio feugiat interdum eget in magna. Fusce vulputate massa vitae est dignissim, non sagittis lectus facilisis. Sed varius euismod nisl nec feugiat. Etiam dictum, nulla ac gravida mollis, dolor eros faucibus metus, quis vestibulum risus mi vitae augue. Aenean ultricies mattis quam, sit amet fermentum augue mattis vitae. Vivamus vehicula, odio in mollis rhoncus, lacus mi aliquet mauris, id volutpat sapien sem et ex. Vestibulum consectetur lectus eget magna semper interdum. Vivamus gravida aliquam auctor. Pellentesque ultricies elit urna, at mattis nisl interdum sit amet.Aliquam lectus elit, scelerisque vitae placerat lacinia, commodo ut dolor. Donec vitae elit sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin dapibus auctor sem, vel tempor quam tincidunt eget. Suspendisse quis suscipit turpis. Nullam arcu justo, rhoncus vel lectus ac, sollicitudin condimentum nisi. Morbi rhoncus quam non pretium tincidunt. Duis massa ligula, sollicitudin nec odio ut, eleifend pharetra lacus.Praesent volutpat hendrerit dui. Donec pellentesque at metus ac laoreet. In nec felis ut diam congue imperdiet. Vestibulum auctor vehicula magna vel vestibulum. Sed ac tortor finibus, iaculis eros et, porta enim. Nulla convallis ullamcorper sagittis. Quisque feugiat eros ac leo lacinia scelerisque. Proin a suscipit nisi. Sed non lectus ut lorem ullamcorper placerat efficitur at turpis. Morbi condimentum sem urna, id sagittis enim mollis non. Duis iaculis metus eu sem laoreet, eu dapibus libero molestie. Cras iaculis ut metus id elementum. Curabitur convallis consequat justo, at congue neque. Aenean gravida felis tellus, non ultrices leo tincidunt et. Nunc semper felis vitae augue venenatis dapibus. Praesent tincidunt ac odio vitae blandit.Donec rhoncus diam nisi, vel mollis libero laoreet et. Nunc tincidunt risus in tortor elementum imperdiet. In ut ligula gravida, lobortis eros sit amet, molestie sem. Morbi facilisis, eros et aliquam fermentum, orci arcu egestas sem, id varius leo metus vitae tellus. Vestibulum sed metus ut orci scelerisque vestibulum. Fusce nec enim odio. Duis massa nisl, tempor in tellus eu, consectetur egestas lectus. In pharetra ante ut egestas facilisis. Duis dictum euismod nisl, vel finibus libero gravida sed. Sed sagittis, tortor efficitur ultrices lacinia, neque velit tristique enim, sed tristique nibh magna quis nulla. Proin sodales blandit metus vitae interdum. Fusce at luctus ligula. Integer gravida, ipsum id vehicula consequat, justo nunc tempor massa, ut bibendum nibh turpis quis justo. Sed accumsan diam sit amet iaculis iaculis. Vestibulum luctus eu nisl non tristique. Nam tincidunt dolor ut pellentesque convallis. Donec fringilla ante vel urna ultrices, at pretium diam feugiat. Vestibulum blandit id ante sed facilisis. Donec sit amet neque vel lorem rhoncus volutpat. Praesent volutpat nunc non diam auctor vulputate. Quisque sit amet enim vitae lorem dictum maximus. Etiam tincidunt vestibulum nisi et dapibus. Duis convallis ipsum nisi, vitae vulputate ipsum molestie nec. Duis maximus enim ac tristique gravida. Cras consectetur, nisi at bibendum iaculis, orci massa sollicitudin ex, sit amet placerat ipsum ipsum ac sapien. Vivamus ligula sem, facilisis at scelerisque id, suscipit a purus. Curabitur sodales blandit eros id lacinia. Morbi sed elit velit. Aliquam ut lobortis quam. Donec non ligula at enim facilisis scelerisque hendrerit quis odio. Pellentesque vulputate et enim ut sagittis. Nunc dignissim ex eu aliquam ultrices. Donec porttitor lorem et libero pretium, id feugiat ligula euismod. Mauris in enim at quam vehicula pellentesque a non ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed tempor lectus id vestibulum pharetra. Quisque vel felis lorem. Maecenas laoreet urna vel ultricies iaculis. Integer euismod neque convallis feugiat mollis. Proin hendrerit lobortis porttitor. Curabitur efficitur, sapien quis venenatis tincidunt, tortor erat elementum erat, eu posuere lacus arcu quis nisl. Integer posuere dolor eu lectus suscipit suscipit. Quisque eget tristique nibh, a luctus urna. Cras luctus magna at libero imperdiet gravida. Maecenas suscipit ipsum dictum turpis congue fermentum. Nam egestas at tellus quis iaculis. Ut libero massa, commodo imperdiet nunc sed, interdum mattis ipsum. Quisque vel eros augue. Proin consectetur tempor massa, vitae egestas lectus mollis nec. Ut scelerisque velit vel consectetur semper. Fusce neque ante, tempor nec diam eget, faucibus lacinia dolor. Integer condimentum non orci eu mattis. Donec vehicula, libero et finibus faucibus, metus libero luctus velit, et commodo metus magna in enim. Vivamus vel sagittis augue. Nunc fringilla vehicula aliquet. Nam eu laoreet diam, sit amet euismod enim. Mauris vestibulum purus vel eros fermentum mollis. Integer risus est, eleifend non elit ut, tincidunt tempus neque. Suspendisse potenti. Vivamus et urna viverra, ultricies urna eget, maximus ex. Cras consectetur nulla et pellentesque ultrices. Cras pretium dapibus purus, ac dapibus metus tincidunt eget. Duis nisi orci, ultricies ultrices rutrum quis, ultricies et odio. Curabitur posuere ex mi, ut pharetra orci hendrerit vel. Proin vel consequat velit. Suspendisse sed velit nec sem elementum faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque justo, egestas sit amet ipsum id, luctus ultrices sem. Sed nec consectetur enim. Sed ut lacinia odio. Phasellus sagittis turpis ultrices fermentum commodo. Ut vestibulum ultricies urna. Sed quis massa sit amet magna lobortis gravida et ac diam. Nam a egestas tortor, id commodo orci.";

/**
 * Prices Generator
 */
const perlinField = {
  seed: Math.random() * 100,
  scale: 100
};

const perlinRandom = (x, field = perlinField) => {
  let range = 100;
  return (Math.pow(x + field.seed + 100, 6) % range) / range;
};

const getPerlinNoise = (x, field = perlinField) => {
  let simDepth = 5;

  let range = 1;

  let chunkSize = field.scale;

  let noise = 0;

  let rangeAccum = 0;

  for (let i = 0; i < simDepth; i++) {
    chunkSize = chunkSize / 2;
    range = range / 2;

    rangeAccum += range;

    let chunkIndex = Math.floor(x / chunkSize);

    let prog = (x % chunkSize) / chunkSize;

    let left_random = perlinRandom(chunkIndex, field) * range;
    let right_random = perlinRandom(chunkIndex + 1, field) * range;

    noise += (1 - prog) * left_random + prog * right_random;
  }

  return noise / rangeAccum;
};

const pricesGenerator = (length, field = perlinField) => {
  const amplitude = 100;
  const frequency = 0.5;
  return lodash.range(length).map((i) => {
    return getPerlinNoise(i, field) * frequency * amplitude;
  });
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Main data generator
 */
const companiesList = [
  "Avocado Purple",
  "Mango Pink",
  "Ananas Blue",
  "Banana Fucsia"
];
const marketsList = ["Energy", "Farming", "Mining"];

const priceFormatter = (date, price) => ({
  date,
  price
});

const generateData = () => {
  const today = moment();
  const sequenceStart = today.clone().subtract(30, "days"); // 30 days ago
  const sequenceEnd = today.clone(); // today
  const datesRange = Array.from(
    momentRange.range(sequenceStart, sequenceEnd).by("day")
  );

  const companies = companiesList.map((name, id) => ({
    id,
    name,
    market: getRandomInt(0, 2),
    description: loremIpsum.substr(0, 100)
  }));

  const companiesPrices = companiesList.map((name, id) => {
    const prices = pricesGenerator(datesRange.length, {
      seed: Math.random() * 100,
      scale: 100
    });
    const pricesByDates = datesRange.map((date, i) =>
      priceFormatter(date.format("YYYY-MM-DD"), prices[i])
    );
    return {
      company: id,
      prices: pricesByDates
    };
  });

  const markets = marketsList.map((name, id) => ({
    id,
    name,
    description: loremIpsum.substr(0, 100)
  }));

  const marketsPrices = marketsList.map((name, id) => {
    const prices = pricesGenerator(datesRange.length, {
      seed: Math.random() * 100,
      scale: 100
    });
    const pricesByDates = datesRange.map((date, i) =>
      priceFormatter(date.format("YYYY-MM-DD"), prices[i])
    );
    return {
      market: id,
      prices: pricesByDates
    };
  });

  return {
    companies,
    companiesPrices,
    markets,
    marketsPrices
  };
};


module.exports = { generateData };
