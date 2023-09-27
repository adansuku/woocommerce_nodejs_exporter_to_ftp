
# 🌟 Custom WooCommerce Export to FTP Automation

Welcome to the enchanting realm of WooCommerce Automation!
This spellbinding script sprinkles magic on your orders and sends them off to the mystical land of FTP. 🚀✨

## 📜 Installation
To unleash this magic upon your system, install the required spells:
```npm install```

🧙‍♂️ Spell Configuration
Set up your magical WooCommerce portal with your secret keys and FTP credentials. Guard these secrets with your wizarding life!

    const WooCommerce = new WooCommerceRestApi({
    url: 'https://mywebsite.com',
    consumerKey: 'ck_**************', // Your consumer key
    consumerSecret: 'cs_**************', // Your consumer secret
    version: 'wc/v3'
    });

**FTP Server Configuration with SSL**
    const ftpConfig = {
        host: '82.98.168.228',
       	port: 21,
       	user: '******', // Your magical username
       	password: '**************' // Your secret password	
    };

✨ Casting Spells
Run the script and witness the magic unfold! It retrieves orders, transforms them into CSV files, and sends them soaring to the FTP realm. 🎩🕊️
 
```node my_script.js```

🚀 Celebrate the Magic
As the console lights up with enchanting messages, celebrate your newfound powers in the world of automation!

🎉 Congratulations, Wizard of Automation! May your code forever be enchanted! 🧙‍♀️💻🌟