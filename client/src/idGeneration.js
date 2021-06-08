const idGeneration = function () {
  let id = ''
  const symbols = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_'
  for (let i = 0; i < 10; i++) {
    const number = Math.floor(Math.random() * (symbols.length - 1))
    id = id + symbols[number]
  }
  return id
}

export default idGeneration
