const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');
const obtainMethod = require('../../filters/minions/obtainMethods');
const localisationStrings = require('../../filters/minions/localisationStrings');

module.exports = new Helper("Minion", "minions", {
  api: 'Companion',
  columns: [
    'IconSmall',
    'ID',
    'Name_de',
    'Name_en',
    'Name_fr',
    'Name_ja',
    'GamePatch.ID'
  ],
  list: true,
  v3: true,
  format: (data, args) => {
    const items = args[1];

    const response = {
      localisation: localisationStrings,
      data: data.filter(entry => entry.IconSmall).map(entry => {
        const result = {
          icon: +entry.IconSmall.replace(/^.*\/(\d+)\.png$/, (match, group) => {
            return group;
          }),
          id: entry.ID,
          name: {
            de: entry.Name_de,
            en: entry.Name_en && entry.Name_en.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' '),
            fr: entry.Name_fr,
            jp: entry.Name_ja
          },
          patch: entry['GamePatch.ID'] || 2
        }

        switch (result.id) {
          // Ignore child minions.
          // Individual Minion Of Light minions.
          case 68:
          case 69:
          case 70:
          // Individual Wind-up Leader minions.
          case 72:
          case 73:
          case 74:
          result.hasParent = true;
            break;

          // Populate method on all others.
          default: {
            const method = obtainMethod(result, args && args[0]);
            result.ref = method && !(method instanceof Array) ? [method] : method;
            break;
          }
        }

        const item = items.minions.filter(i => i.awards === result.id)[0];

        if (item && item.untradable)
          result.untradable = true;

        return result;
      })
    }

    let methods = 0;
    const available = response.data.filter(d => {
      const m = d.ref && d.ref.filter(r => !r.promo && r.available).length;
      methods += m || 0;
      return m;
    }).length;

    createHTML("minions", {
      data: response.data,
      emoji: "🐧",
      list: true,
      title: 'Minions List | Apkallu Falls',
      description: `There are ${methods} ways to obtain the ${available} minions available right now in-game in Final Fantasy XIV. Here's how you obtain all of them.`,
      section: "Minions"
    }, undefined, () => {});

    return response;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("minions", data, base, _helperCreateJSONFn);
});