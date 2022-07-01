// This function detects most providers injected at window.ethereum
var Web3 = require('web3');
var TruffleContract = require('truffle-contract');

App = {
    web3Provider: null,
    contracts: {},
    currentAccount:{},

    initWeb3 : async function (){
        // Initialize the Web3 Provider with the Wallet Details
        if (process.env.MODE == 'development'){
            App.web3Provider = new Web3.providers.HttpProvider(process.env.LOCAL_NODE); //for local development
        }
        else if(typeof window.web3 === 'undefined'){
            App.showError("Install MetaMask");
        }
        else{
             App.web3Provider = web3.currentProvider; //for getting information from connected wallet
        }
        web3 = new Web3(App.web3Provider);
        return  await App.initContractHelloWorld();
    },

    initContractHelloWorld : async function (){
        //Function to fetch the HelloWorld Contract ABI
        await $.getJSON('HelloWorld.json',function(message){
            var HelloWorldArtifact = message;
            App.contracts.HelloWorld = TruffleContract(HelloWorldArtifact);
            App.contracts.HelloWorld.setProvider(App.web3Provider);        
        })
        return App.bindEvents();
    },
    bindEvents: function() { 
        $('#buttonSave').click(App.setName);  //Setting on-click function for Save Button
        $('#buttonMessage').click(App.loadMessage); //Setting on-click function for Greet Button to display message
    },

    loadMessage : function (){
    //Function to Load Message
        App.contracts.HelloWorld.deployed().then(async function(instance){
            let message;
            if(App.currentAccount.length){
                message = await instance.getMessage.call({from:App.currentAccount});  
            }
            else{
                message = await instance.getMessage.call();  
            }
            App.showMessage(message);
        }).catch((err) =>{
            App.showError(err);
        })
    },

    showMessage: function (msg){
    //Function to Load Message "Hello, Name"
        $('#output').html(msg.toString());
        $('#errorHolder').hide();
        $('#output').show();
    },

    //Function to Print Error Messages
    showError: function(err){
        if(err.message != undefined){
            $('#errorHolder').html(err.message.toString()); 
        }
        else{
            $('#errorHolder').html(err.toString());
        }
        $('#errorHolder').show();
        $('#output').hide();
    },

    setName: function (){
    //Function to Set Name
        if ($('#name').val()){
             web3.eth.getAccounts(function (error,accounts){
            if (error){
                if (accounts.length === 0) {
                    console.log('Please connect to MetaMask.');
                }
               App.showError(error);
            }
            App.currentAccount = accounts[0];
            App.contracts.HelloWorld.deployed().then(function(instance){
              return instance.setName.sendTransaction($('#name').val(),{from:App.currentAccount})
            }).then(function(result){
                document.getElementById("name").value = "";
                App.showMessage('Save Successful');
            }).catch(function (error){
                App.showError(error);
            })
          })
        }
        else if($('#name').val() == ""){
            App.showError('Error: Enter a Name to Save.');
        }
    },
    init : async function (){
        await App.initWeb3();       
        App.loadMessage();          
    }
 
}  
 
$(function() {
    $(window).load(function() {
        $('#errorHolder').hide();
        $('#output').hide();
         
      App.init();
    });
  });