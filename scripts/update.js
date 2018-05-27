const fs = require('fs');
const cacheBust = require('./_cacheBust');

console.log("\n");

const update = async function (args) {
  let config = {};

  if (args.length)
    args.forEach(a => config[a] = true);
  else
    config = false;
  
  let achievementCategories;
  let achievementsList;
  let minionsList;
  let mountsList;
  let titlesList;

  let achievementCategoriesV3;
  let achievementsListV3;
  let titlesListV3;

  await new Promise((resolve) => fs.readFile('../docs/achievement_categories.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementCategories = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/achievements.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementsList = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/minions.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => minionsList = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/mounts.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => mountsList = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/titles.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => titlesList = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/achievement_categories.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementCategoriesV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/achievements.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => achievementsListV3 = JSON.parse(data));

  await new Promise((resolve) => fs.readFile('../docs/v3/titles.json', 'utf8', (e, data) => {
    resolve(data);
  })).then(data => titlesListV3 = JSON.parse(data));

  // // Patches
  if (!config || config.patches) {
    message('Patches');
    await require('./patches/list.js').fetch(
      achievementsList,
      minionsList,
      mountsList,
      titlesList
    );
  }

  // // Achievements.
  if (!config || config.achievements) {
    message('Achievements');
    await require('./achievements/data.js').fetch();
    await require('./achievements/list.js').fetch(achievementCategories);
  }
  if (config && config.achievementsList) {
    await require('./achievements/list.js').fetch(achievementCategories);
  }

  // Minions.
  if (!config || config.minions) {
    message('Minions');
    await require('./minions/data.js').fetch();
    await require('./minions/list.js').fetch(achievementsList);
  }
  if (config && config.minionsList) {
    await require('./minions/list.js').fetch(achievementsList);
  }

  // Mounts.
  if (!config || config.mounts) {
    message('Mounts');
    await require('./mounts/data.js').fetch();
    await require('./mounts/list.js').fetch(achievementsList);
  }
  if (config && config.mountsList) {
    await require('./mounts/list.js').fetch(achievementsList);
  }

  // Titles.
  if (config && config.titlesList) {
    await require('./titles/list.js').fetch(achievementsList, achievementCategories);
  }

  // Totals.
  if (!config || config.totals) {
    message('Totals');
    require('./totals/list.js')();
  }

  if (!config || config.icons) {
    message('Icons');
    await require('./icons/achievements.js').fetch();
    await require('./icons/minions.js').fetch();
    await require('./icons/mounts.js').fetch();
    await require('./icons/items.js').fetch();
  }

  if (config && config.characters) {
    await require('./characters/data.js')();
  }

  // // Achievements V3.
  if (!config || config.achievementsV3) {
    message('Achievements');
    await require('./achievements/dataV3.js').fetch();
    await require('./achievements/listV3.js').fetch(achievementCategoriesV3);
  }
  if (config && config.achievementsListV3) {
    await require('./achievements/listV3.js').fetch(achievementCategoriesV3);
  }

  // Titles V3.
  if (config && config.titlesListV3) {
    await require('./titles/listV3.js').fetch(achievementsListV3, achievementCategoriesV3);
  }

  // Cache bust.
  console.info("!! Remember to run patches after all other lists are updated.");
  cacheBust();
}

function message(type) {
  console.info("Updating " + type + ".");
}

update(process.argv.slice(2));