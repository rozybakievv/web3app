require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.10",
  networks: {
      ropsten: {
          url: "https://eth-ropsten.alchemyapi.io/v2/Tz5L0iI64y-Jz60awOk7w-pgVKmuYyh-",
          accounts: ['3b9cef8cf3d53dc66cbd71e3710561fb5413a89c73b73cf9cd3ef45d2eed72eb']
      }
  }
};
