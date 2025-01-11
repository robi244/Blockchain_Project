from web3 import Web3

infura_url = "https://sepolia.infura.io/v3/be59e36653dd44daa08002b49e3250f4"
web3 = Web3(Web3.HTTPProvider(infura_url))

if web3.is_connected():
    print("Connected to Sepolia!")
else:
    print("Connection failed.")
