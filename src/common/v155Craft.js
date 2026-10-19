export function normalizeV155Name(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getV155ItemTransitionName(item) {
  const rawId = item?.id ?? item?.mapObjectIds?.[0] ?? item?.name ?? 'unknown'
  const safeId = String(rawId).replace(/[^a-zA-Z0-9_-]/g, '-')

  return `v155-item-icon-${safeId}`
}

export function buildV155ItemIndexes(items) {
  const byId = new Map()
  const byCode = new Map()
  const byName = new Map()

  for (const item of items) {
    if (!item) continue

    if (item.id != null) {
      byId.set(String(item.id), item)
    }

    for (const code of item.mapObjectIds || []) {
      if (code != null) {
        byCode.set(String(code), item)
      }
    }

    if (item.name) {
      byName.set(normalizeV155Name(item.name), item)
    }

    if (item.mapName) {
      byName.set(normalizeV155Name(item.mapName), item)
    }
  }

  return { byId, byCode, byName }
}

export function resolveV155Ingredient(ingredient, indexes) {
  if (!ingredient || !indexes) return null

  const itemId = ingredient.itemId ?? ingredient.id

  if (itemId != null) {
    const itemById = indexes.byId.get(String(itemId))

    if (itemById) return itemById
  }

  const rawcode = ingredient.rawcode ?? ingredient.code

  if (rawcode != null) {
    const itemByCode = indexes.byCode.get(String(rawcode))

    if (itemByCode) return itemByCode
  }

  const name = ingredient.name || ingredient.text

  if (!name) return null

  return indexes.byName.get(normalizeV155Name(name)) || null
}

export function hasV155Craft(item) {
  if (!item || !Array.isArray(item.ingredients) || !item.ingredients.length) return false

  return item.ingredients.some((ingredient) => !isSourceIngredient(ingredient, null))
}

function isWrappedText(text) {
  const first = text[0]
  const last = text[text.length - 1]

  return (
    (first === '[' && last === ']') ||
    (first === '(' && last === ')') ||
    (first === '{' && last === '}')
  )
}

function isSourceIngredient(ingredient, item) {
  if (!ingredient) return true
  if (ingredient.source) return true
  if (item) return false
  if (ingredient.itemId != null || ingredient.rawcode != null || ingredient.code != null) {
    return false
  }

  const text = String(ingredient.name || ingredient.text || '').trim()

  return isWrappedText(text) || /созда|кузниц|портал|плавильн|печь/i.test(text)
}

function cleanIngredientName(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/[,\s]+$/g, '')
    .trim()
}

function cleanSourceText(value) {
  let text = String(value || '').trim()

  while (text && '([{'.includes(text[0])) text = text.slice(1).trim()
  while (text && ')]}'.includes(text[text.length - 1])) text = text.slice(0, -1).trim()

  return text
}

function getIngredientKey(ingredient, item) {
  if (item?.id != null) return `id:${item.id}`
  if (ingredient.rawcode != null) return `code:${ingredient.rawcode}`

  return `name:${normalizeV155Name(ingredient.name || ingredient.text)}`
}

function aggregateIngredients(ingredients, indexes) {
  const aggregated = new Map()

  for (const ingredient of ingredients) {
    const item = resolveV155Ingredient(ingredient, indexes)

    if (isSourceIngredient(ingredient, item)) continue

    const name = cleanIngredientName(item?.name || ingredient.name || ingredient.text)

    if (!name) continue

    const key = getIngredientKey(ingredient, item)
    const count = Number(ingredient.count) || 1
    const existing = aggregated.get(key)

    if (existing) {
      existing.count += count
    } else {
      aggregated.set(key, {
        key,
        name,
        count,
        item,
        iconPath: item?.iconPath || '',
      })
    }
  }

  return [...aggregated.values()]
}

export function getV155RecipeGroups(item, indexes) {
  if (!item || !Array.isArray(item.ingredients) || !item.ingredients.length) return []

  const ingredients = aggregateIngredients(item.ingredients, indexes)

  if (!ingredients.length) return []

  return [
    {
      key: `${item.id ?? item.name ?? 'item'}-recipe-0`,
      label: '',
      resultCount: 1,
      ingredients,
    },
  ]
}

export function getV155RecipeSources(item) {
  if (!item || !Array.isArray(item.ingredients)) return []

  return [
    ...new Set(
      item.ingredients
        .filter((ingredient) => isSourceIngredient(ingredient, null))
        .map((ingredient) => cleanSourceText(ingredient.text || ingredient.name))
        .filter(Boolean)
    ),
  ]
}

export function getV155UsedInItems(item, items, indexes) {
  if (!item || item.id == null) return []

  const targetId = String(item.id)
  const usedIn = new Map()

  for (const candidate of items) {
    if (!candidate || candidate.id == null || String(candidate.id) === targetId) continue

    const key =
      normalizeV155Name(candidate.name || candidate.mapName) || `id:${String(candidate.id)}`

    for (const group of getV155RecipeGroups(candidate, indexes)) {
      const ingredient = group.ingredients.find(
        (entry) => entry.item && String(entry.item.id) === targetId
      )

      if (!ingredient) continue

      if (!usedIn.has(key)) {
        usedIn.set(key, {
          item: candidate,
          count: ingredient.count,
        })
      }

      break
    }
  }

  return [...usedIn.values()]
}
