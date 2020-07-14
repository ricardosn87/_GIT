export const DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'marcas',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'idIndex', keypath: 'idIndex'},
        { name: 'idMarca' , keypath: 'idMarca'},
        { name: 'nome' , keypath: 'nome'},
        { name: 'descricao' , keypath: 'descricao'},
        { name: 'nomeEmpresa', keypath: 'nomeEmpresa' },
        { name: 'idEmpresa', keypath: 'idEmpresa' }        
      ]
    }
  ]
};