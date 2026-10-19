# good food near me

weathercrab's food-loving sibling: a little crab shows you the top restaurants in a city. Each spot is drawn as its own storefront with the crab out front in an apron, holding up the dish you're looking at.

- **227 cities**: all five New York boroughs, Florida (Delray Beach, Boca Raton, Miami and more), Southern California (Mission Viejo, Irvine & Costa Mesa, Newport Beach, Laguna Beach and more), Connecticut & New Jersey, all 50 state capitals plus Washington, DC, the biggest US cities, more food towns like Wichita, Bozeman, Jackson Hole and Lexington, and 62 cities around the world, including Tel Aviv, Jerusalem, Beirut, Amman and Tbilisi.
- **5,972 saved spots**: up to 25 per city, fewer in small towns. Each has a neighborhood, price level, star rating and its best-known dishes.
- **Whole states**: the city picker has a "whole states" tab that ranks the top 100 across every saved city in a state, plus more of the state's spots beyond each city's top 25. 23 states fill all 100; smaller states show what the crab is confident about (North Dakota has 32).
- **Pick a cuisine** next to the city: pizza, tacos, sushi, bbq, delis and 20 more.
- **Swipe the menu**: each dish has its price, a tag (the signature, spicy, vegetarian…) and a short description. The crab holds up each dish and reacts to it: it hops for the signature, sweats for spicy food and gets nervous holding crab claws.
- **Every storefront is different**: brick in New York, pastel with a palm tree in Miami, iron balconies in New Orleans, stone in Paris, adobe in Santa Fe. Lanterns, string lights, a chimney for bbq or a life ring for seafood depend on the cuisine.
- **Use my location** in the city picker finds where you are and opens the nearest saved city, labeled "near you" (or "closest to you, 40 mi" when you're far from all of them). It uses the browser's location if you allow it, otherwise a rough guess from your network via [BigDataCloud](https://www.bigdatacloud.com)'s free lookup. If you used it last time, the site opens near you again.
- **View more top spots** opens a grid of mini storefronts.
- **The crab button** at the top left adds the app to your home screen: Android and Chrome show their install prompt, iPhone gets three quick steps (Share → Add to Home Screen → Add), and computers get the steps for Chrome, Edge and Safari. It opens full screen like an app and works offline.

It is one static `index.html` with no build step and no dependencies.

## How the rankings work

The saved picks come from Claude's own knowledge, not from a live data source. Claude chose and ordered them from what it learned about each city's food scene: Michelin stars and Bib Gourmands, James Beard awards, critics' and local best-of lists, how long a place has been loved, and how often it comes up as a must-visit. It also aimed for a spread of neighborhoods, cuisines and price levels.

- It's judgment, not a formula. No reviews were pulled or averaged, and #8 vs. #11 doesn't mean much.
- Whole-state lists start with Claude's own picks for the biggest states, then rank everything else by estimated stars, nudged down by how far down its own city's list a place sits.
- Star ratings are Claude's estimates of each place's typical score on big review sites, not live Google or Yelp numbers.
- Prices come from Claude's latest menu info and are before taxes, tips and fees. Menus change and places close, so check before you go.

The page also explains this behind the **?** button.

## What only works where

- **Use my location** works on this standalone site. Inside a Claude artifact the browser blocks location, so the button is hidden there.
- **Live scouting** only works inside Claude (see below).

## Live scouting only works inside Claude

When the page is opened as a Claude artifact, Claude can scout cities that aren't saved, a full 25 for any cuisine, 25 more spots at a time (up to 300) and fuller menus. On this standalone site those features are hidden, because they need Claude. Everything saved works the same.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app |
| `favicon.svg` | Browser tab icon |
| `goodfood-icon-180.png` | Icon when added to an iPhone home screen |
| `goodfood-icon-192.png`, `goodfood-icon-512.png` | Icons for Android and installed web apps |
| `apple-touch-icon.png`, `apple-touch-icon-precomposed.png`, `icon-192.png`, `icon-512.png` | The same white icons under older names, for browsers that look for them |
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

All the data lives in `index.html`, in the `SAVED` object near the top of the script. Lists named "around <state>" hold extra statewide spots and don't show in the city picker; `STATE_PICKS` sets the spots that lead each whole-state list. Each city lists its spots as:

```js
["restaurant name", "neighborhood", "cuisine", yearOpened, priceLevel1to4, stars, "why it's great", [
  ["dish", price, "what it is", "tag", "optional drawing"],
  ...
]]
```

Prices can also be `"mp"` (market price), `"set"` (part of a set menu) or `"incl"` (comes with the meal). Tags are `sig`, `spicy`, `veg`, `share`, `sweet`, `drink` or `""`.
