const Helper = require('../_helper');
const createHTML = require('../_HTML');
const createList = require('../_list');

module.exports = new Helper("Patch", "patches", {
  api: 'PatchList',
  list: true,
  v3: true,
  format: (data, args) => {
    console.info(data.length);
    const formattedData = data.map(patch => {
      const response = {
        date: +(patch.ReleaseDate + '000'),
        id: patch.ID,
        name: {
          de: patch.Name_de,
          en: patch.Name_en,
          fr: patch.Name_fr,
          jp: patch.Name_ja
        },
        version: patch.Version
      }

      const image = getPatchImage(patch.ID);
      if (image)
        response.image = image;

      return response;
    })

    if (args) {
      const achievements = args[0] && args[0].data;
      const minions = args[1] && args[1].data;
      const mounts = args[2] && args[2].data;
      const titles = args[3] && args[3].data;
      const emotes = args[4] && args[4].data;
      const barding = args[5] && args[5].data;
      const orchestrionRolls = args[6] && args[6].data;

      formattedData.forEach(f => {
        const counts = {};

        const achievementsChange = achievements instanceof Array && achievements.filter(a => a.patch === f.id).length || 0;
        if (achievementsChange) {
          const totalAchievements = achievements.filter(a => a.patch <= f.id).length;

          counts.achievements = {
            change: achievementsChange,
            total: totalAchievements
          };

          counts.achievements.percent = (
            totalAchievements - achievementsChange === 0
            ? '∞'
            : Math.round(((100/(totalAchievements - achievementsChange)) * achievementsChange) * 10) / 10
          );
        }

        const minionsChange = minions instanceof Array && minions.filter(a => a.patch === f.id).length || 0;
        if (minionsChange) {
          const totalMinions = minions.filter(a => a.patch <= f.id).length;

          counts.minions = {
            change: minionsChange,
            total: totalMinions
          };

          counts.minions.percent = (
            totalMinions - minionsChange === 0
            ? '∞'
            : Math.round(((100/(totalMinions - minionsChange)) * minionsChange) * 10) / 10
          );
        }

        const mountsChange = mounts instanceof Array && mounts.filter(a => a.patch === f.id).length || 0;
        if (mountsChange) {
          const totalMounts = mounts.filter(a => a.patch <= f.id).length;

          counts.mounts = {
            change: mountsChange,
            total: totalMounts
          };

          counts.mounts.percent = (
            totalMounts - mountsChange === 0
            ? '∞'
            : Math.round(((100/(totalMounts - mountsChange)) * mountsChange) * 10) / 10
          );
        }

        const titlesChange = titles instanceof Array && titles.filter(a => a.patch === f.id).length || 0;
        if (titlesChange) {
          const totalTitles = titles.filter(a => a.patch <= f.id).length;

          counts.titles = {
            change: titlesChange,
            total: totalTitles
          };

          counts.titles.percent = (
            totalTitles - titlesChange === 0
            ? '∞'
            : Math.round(((100/(totalTitles - titlesChange)) * titlesChange) * 10) / 10
          );
        }

        const emotesChange = emotes instanceof Array && emotes.filter(a => a.patch === f.id).length || 0;
        if (emotesChange) {
          const totalEmotes = emotes.filter(a => a.patch <= f.id).length;

          counts.emotes = {
            change: emotesChange,
            total: totalEmotes
          };

          counts.emotes.percent = (
            totalEmotes - emotesChange === 0
            ? '∞'
            : Math.round(((100/(totalEmotes - emotesChange)) * emotesChange) * 10) / 10
          );
        }

        const bardingChange = barding instanceof Array && barding.filter(a => a.patch === f.id).length || 0;
        if (bardingChange) {
          const totalBarding = barding.filter(a => a.patch <= f.id).length;

          counts.barding = {
            change: bardingChange,
            total: totalBarding
          };

          counts.barding.percent = (
            totalBarding - bardingChange === 0
            ? '∞'
            : Math.round(((100/(totalBarding - bardingChange)) * bardingChange) * 10) / 10
          );
        }

        const orchestrionRollsChange = orchestrionRolls instanceof Array && orchestrionRolls.filter(a => a.patch === f.id).length || 0;
        if (orchestrionRollsChange) {
          const totalOrchestrionRolls = orchestrionRolls.filter(a => a.patch <= f.id).length;

          counts['orchestrion-rolls'] = {
            change: orchestrionRollsChange,
            total: totalOrchestrionRolls
          };

          counts['orchestrion-rolls'].percent = (
            totalOrchestrionRolls - orchestrionRollsChange === 0
            ? '∞'
            : Math.round(((100/(totalOrchestrionRolls - orchestrionRollsChange)) * orchestrionRollsChange) * 10) / 10
          );
        }

        if (Object.keys(counts).length)
          f.counts = counts;
      })
    }

    const patchesWithImages = formattedData.filter(d => d.image);

    createHTML("patches", {
      data: formattedData,
      emoji: "🔨",
      list: true,
      title: 'Patch Breakdown | Apkallu Falls',
      description: `Apkallu Falls tracks data from ${formattedData.length} different Final Fantasy XIV patches up to Patch ${formattedData[formattedData.length-1].version}, with new content added every time the game updates.`,
      section: "Patches"
    }, undefined, () => {});

    return formattedData;
  }
}, (data, base, _helperCreateJSONFn) => {
  createList("patches", data, base, _helperCreateJSONFn);
});

function getPatchImage(patch) {
  switch (patch) {
    case 2:
      return "/patches/2.0.png";

    case 4:
      return "/patches/2.1.png";

    case 8:
      return "/patches/2.2.png";

    case 11:
      return "/patches/2.3.png";

    case 14:
      return "/patches/2.4.png";

    case 16:
      return "/patches/2.5.png";

    case 19:
      return "/patches/3.0.png";

    case 23:
      return "/patches/3.1.png";

    case 25:
      return "/patches/3.2.png";

    case 27:
      return "/patches/3.3.png";

    case 30:
      return "/patches/3.4.png";

    case 32:
      return "/patches/3.5.png";

    case 36:
      return "/patches/4.0.png";

    case 40:
      return "/patches/4.1.png";

    case 43:
      return "/patches/4.2.png";

    case 45:
      return "/patches/4.3.png";
  }
}