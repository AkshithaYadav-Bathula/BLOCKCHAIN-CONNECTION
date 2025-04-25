// Ensure MetaMask is installed
if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
} else {
    alert("Please install MetaMask to use this dApp.");
}

// Web3.js initialization
const web3 = new Web3(window.ethereum);
const contractAddress = "0x88B0Bc01Cd97E269ce843Af1D928a05DA027BFBc";  // Your Contract Address

// Paste your contract ABI here from Remix
const contractABI = [
    {
        "constant": false,
        "inputs": [{ "name": "x", "type": "uint256" }],
        "name": "setAge",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAge",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

let userAccount;

// Connect MetaMask
document.getElementById("connectButton").addEventListener("click", async () => {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAccount = accounts[0];
        alert("Connected: " + userAccount);
    } catch (error) {
        console.error(error);
        alert("Connection failed!");
    }
});

// Set Age Function
document.getElementById("setAgeButton").addEventListener("click", async () => {
    const ageValue = document.getElementById("ageInput").value;
    if (!ageValue) {
        alert("Enter a valid age!");
        return;
    }

    try {
        await contract.methods.setAge(ageValue).send({ from: userAccount });
        alert("Age set successfully!");
    } catch (error) {
        console.error(error);
        alert("Transaction failed!");
    }
});

// Get Age Function
document.getElementById("getAgeButton").addEventListener("click", async () => {
    try {
        const age = await contract.methods.getAge().call();
        document.getElementById("ageDisplay").textContent = "Stored Age: " + age;
    } catch (error) {
        console.error(error);
        alert("Failed to fetch age!");
    }
});
