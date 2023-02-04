
export default class Service {
    static startTime = (end,setH,setM,setS) => {
        let fin =new Date(Date.parse(end))
        setInterval(() => {
            let ans = Service.between(fin);
            setH(ans.hours)
            setM(ans.minute)
            setS(ans.second)
        },
        1000)
    }

    static between = (end) => {
        // console.log(end);
        let start = new Date(Date.now())
        let total = end.getTime() - start.getTime();
        let totalHours = Math.floor(total / (1000 * 60 * 60 ))
        let hours = totalHours;
        let minute = Math.floor((total / (1000 * 60)) % 60)
        let second = Math.floor((total / (1000 ))%60);
        return {
            hours : hours,
            minute : minute,
            second : second
        }
    }

    static getData = (url,onReady) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            onReady(data);
        });
    }

    static sendData = (url,data, onReady) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            onReady(data);
        })
    }

    static moneyFormat = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'MGA',
        minimumFractionDigits: 2
    });

    static formatDate = (date) => {
        let dObjt = new Date(date);
        let ans = dObjt.toLocaleDateString("fr-FR", {
            day : "numeric",
            month : "long",
            year : "numeric"
        });
        return ans;
    }

    static format = (data) => {
        return Service.moneyFormat.format(data);
    }

    static getPLaceNbByType = (avion,type) => {
        for (let i = 0; i < avion.classes.length; i++) {
            if (avion.classes[i].type.id === type.id) {
                return Service.getPLaceNumber(avion,avion.classes[i]);
            }
        }
        return 0;
    }

    static getPLaceNumber = (avion,cls) => {
        let rang = parseInt(avion.rang,10);
        let siege = parseInt(cls.rfin,10)-parseInt(cls.rdebut,10)+1;
        return rang * siege;
    }
    
    static getTotalPlace =(avion) => {
        let ans = 0;
        for (let i = 0; i < avion.classes.length; i++) {
            ans += Service.getPLaceNumber(avion,avion.classes[i]);
        }
        return ans;
    }
}