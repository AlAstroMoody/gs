import instance from "@/api/instance"


export const getItems = async () => {
  const response = await instance.get(`items/?populate=*`).catch(error => console.log(error))

  return response.data.data.map(item => {
    const { description, level, name, params } = item.attributes
		const src = item.attributes.src.data

    return {
      id: item.id,
      description,
      level: level ? level : 0,
      name, 
      params,
      children: getRelative(item.attributes.children.data),
      parents: getRelative(item.attributes.parents.data),
      goblins: item.attributes.goblins.data,
      src: src ? `${import.meta.env.VITE_BASE_URL}${src[0].attributes.url}` : null
    }
  })
}

const getRelative = (data) => {
	return data.map(item => ({
		id: item.id,
		name: item.attributes.name
	}))
}