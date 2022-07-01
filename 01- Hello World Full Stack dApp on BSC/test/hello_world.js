var helloworld = artifacts.require('HelloWorld');
contract('HelloWorld', function(accounts) {
  let instance;
  before(async () => {
    instance = await helloworld.deployed();
  });
  
  //Test to check if the default value is set to "hello, world"
  it('Default message should be hello, world',async () => {
    let message = await instance.getMessage.call({from: accounts[0]});           
    assert.equal(message, "Hello, World","Incorrect message.");
  });

  //Test to check if the save button is working or not
  it('Should save name',async () => {
    let result = await instance.setName.sendTransaction('Rumeel',{from: accounts[0]}); 
    let message = await instance.getMessage.call({from: accounts[0]});           
    assert.equal(message, "Hello, Rumeel","Incorrect message.");        
  });

  //Test to check if the default values for accounts other than the 1s default account of wallet
  it('Should be default message for other accounts',async () => {
    let message1 = await instance.getMessage.call({from: accounts[0]});   
    let message2 = await instance.getMessage.call({from: accounts[1]});
    assert.equal(message1, "Hello, Rumeel","Incorrect user message.");  
    assert.equal(message2, "Hello, World","Incorrect message.");  
  });

  //Test to check if error is thrown on empty name field
  it('Should throw error on empty name',async () => {
    try{
      let result = await instance.setName.sendTransaction('',{from: accounts[0]}); 
      assert.fail(true,false,"The function should throw error");  
    }
    catch(err){
        assert.include(String(err),'revert','throws different error');
    }
  });
});
