const { client } = require("./Ice/client");
const { office } = require("./Ice/office");
const { Ice } = require("ice");
const readline = require("readline");

const id = process.argv[2];
const businessId = id + 10;
const age = Math.floor(Math.random() * 50);
let args = process.argv;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getCurrentTime(){
    let currentDate = new Date();
    return new client.Time(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
}

class ReporterImpl extends client.Reporter{
    sendResults(results){
        console.log(results);
    }
}

(async function()
{
    let communicator, adapter;

    try
    {
        communicator = Ice.initialize(args);
        adapter = await communicator.createObjectAdapter("");

        let serviceProxy = await office
            .OfficeServicePrx.checkedCast(communicator.stringToProxy("OfficeService : tcp -h 127.0.0.2 -p 10000 -t 5000"));

        function createReporterProxy(){
            let reporterProxy = client.ReporterPrx.uncheckedCast(
                adapter.addWithUUID(new ReporterImpl())
            )
            serviceProxy.ice_getCachedConnection().setAdapter(adapter);
            return reporterProxy
        }


        let reporterProxy = createReporterProxy();

        try{
            await serviceProxy.connect(id, reporterProxy);
            console.log("connected");
        } catch (e){
            console.log(e);
        }

        function logTime(time){
            console.log("Time to proccess report: " + time + " s");
        }

        function readlineCallback(answear){
            let basicData = new office.ReportData(getCurrentTime(), id);
            console.log(basicData);

            switch (answear){
                case "TAX":
                    let ret = Math.floor(Math.random() * 10000);
                    console.log(ret);
                    serviceProxy
                        .reportTaxReturn(basicData, ret).then(res => logTime(res)).catch(e => console.log(e));
                    break;
                case "ID":
                    serviceProxy
                        .reportIdCardRequest(basicData, age).then(res => logTime(res)).catch(e => console.log(e));
                    break;
                case "TRADE":
                    serviceProxy
                        .reportTradePermissionRequest(basicData, businessId).then(res => logTime(res)).catch(e => console.log(e));
                    break;
                default:
                    console.log("Wrong command :(");
                    break;
            }
            rl.question("Enter next command: TAX, ID, TRADE \n", readlineCallback);
        }

        rl.question("Avaiable commands: TAX, ID, TRADE \n", readlineCallback);
    }
    catch(ex)
    {
        console.log(ex.toString());
        process.exitCode = 1;
    }

}());