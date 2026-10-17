# good food near me

weathercrab's food-loving sibling: a little crab shows you the top restaurants in a city. Each spot is drawn as its own storefront with the crab out front in an apron, holding up the dish you're looking at.

- **193 cities**: all five New York boroughs, Florida (Delray Beach, Boca Raton, Miami and more), Southern California (Mission Viejo, Irvine & Costa Mesa, Newport Beach, Laguna Beach and more), Connecticut & New Jersey, all 50 state capitals plus Washington, DC, the biggest US cities, 24 more food towns, and 58 cities around the world.
- **1,847 saved spots**: up to 25 per city, fewer in small towns. Each has a neighborhood, price level, star rating and its best-known dishes.
- **Pick a cuisine** next to the city: pizza, tacos, sushi, bbq, delis and 20 more.
- **Swipe the menu**: each dish has its price, a tag (the signature, spicy, vegetarian…) and a short description. The crab holds up each dish and reacts to it: it hops for the signature, sweats for spicy food and gets nervous holding crab claws.
- **Every storefront is different**: brick in New York, pastel with a palm tree in Miami, iron balconies in New Orleans, stone in Paris, adobe in Santa Fe. Lanterns, string lights, a chimney for bbq or a life ring for seafood depend on the cuisine.
- **View more top spots** opens a grid of mini storefronts. The dice button picks a random spot.
- On phones it can be added to the home screen. It opens full screen like an app and works offline.

It is one static `index.html` with no build step and no dependencies.

## How the rankings work

The saved picks come from Claude's own knowledge, not from a live data source. Claude chose and ordered them from what it learned about each city's food scene: Michelin stars and Bib Gourmands, James Beard awards, critics' and local best-of lists, how long a place has been loved, and how often it comes up as a must-visit. It also aimed for a spread of neighborhoods, cuisines and price levels.

- It's judgment, not a formula. No reviews were pulled or averaged, and #8 vs. #11 doesn't mean much.
- Star ratings are Claude's estimates of each place's typical score on big review sites, not live Google or Yelp numbers.
- Prices come from Claude's latest menu info and are before taxes, tips and fees. Menus change and places close, so check before you go.

The page also explains this behind the **?** button.

## Live scouting only works inside Claude

When the page is opened as a Claude artifact, Claude can scout cities that aren't saved, a full 25 for any cuisine, 25 more spots at a time (up to 300) and fuller menus. On this standalone site those features are hidden, because they need Claude. Everything saved works the same.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app |
| `favicon.svg` | Browser tab icon |
| `apple-touch-icon.png` | Icon when added to an iPhone home screen |
| `icon-192.png`, `icon-512.png` | Icons for Android and installed web apps |
| `site.webmanifest` | Lets the site be added to a home screen as an app |
| `sw.js` | Service worker: makes the site installable on Android and lets it open offline |
| `.gitignore` | Keeps `.DS_Store` and Vercel's local folder out of git |

## Deploy

1. **GitHub:** create a new repository (for example `good-food-near-me`) at <https://github.com/new>. On the empty repository page, click **uploading an existing file**, drag in every file from this folder, and commit. If the `.gitignore` file doesn't show in Finder, press Cmd+Shift+. to show hidden files. It's optional.
2. **Vercel:** go to <https://vercel.com/new>, import the repository, leave **Framework Preset** on **Other** with no build command, and click **Deploy**.

Every commit to the main branch redeploys automatically.

### Or with git from a terminal

```bash
git init
git add .
git commit -m "good food near me"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/good-food-near-me.git
git push -u origin main
```

## Updating the restaurants

All the data lives in `index.html`, in the `SAVED` object near the top of the script. Each city lists its spots as:

```js
["restaurant name", "neighborhood", "cuisine", yearOpened, priceLevel1to4, stars, "why it's great", [
  ["dish", price, "what it is", "tag", "optional drawing"],
  ...
]]
```

Prices can also be `"mp"` (market price), `"set"` (part of a set menu) or `"incl"` (comes with the meal). Tags are `sig`, `spicy`, `veg`, `share`, `sweet`, `drink` or `""`.
