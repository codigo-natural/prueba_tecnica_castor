export const customGet = async (url, session) => {
  console.log('session custom get:', session)
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => res.json())

  return res
}
