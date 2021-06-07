package pl.agh.application.tasks;

import pl.agh.application.ResultsCache;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

public class SendResultsTask implements Runnable {
    private final client.ReporterPrx reporterProxy;
    private int secondsToWait = 0;
    private final ResultsCache resultsCache;
    private final int reporterId;
    private client.ReportResult reportResult;

    public SendResultsTask(ResultsCache resultsCache, int reporterId,  client.ReporterPrx reporterProxy, int secondsToWait){
        this.resultsCache = resultsCache;
        this.reporterProxy = reporterProxy;
        this.secondsToWait = secondsToWait;
        this.reporterId = reporterId;
    };

    public SendResultsTask(ResultsCache resultsCache, int reporterId, client.ReporterPrx reporterProxy){
        this(resultsCache, reporterId, reporterProxy, 0);
    }

    public SendResultsTask(ResultsCache resultsCache, int reporterId, client.ReporterPrx reporterProxy, int secondsToWait, client.ReportResult reportResult){
        this(resultsCache, reporterId, reporterProxy, secondsToWait);
        this.reportResult = reportResult;
    }


    @Override
    public void run() {
        List<client.ReportResult> resultsToSend;
        if(reportResult == null){
            resultsToSend = resultsCache.getCachedResults(reporterId);
        }
        else {
            resultsToSend = new ArrayList<>();
            resultsToSend.add(reportResult);
        }

        try {
            Thread.sleep(1000L * secondsToWait);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        try {
            if (resultsToSend.size() > 0) {
                System.out.println("[INFO]: Sending results to reporter with id: " + this.reporterId + "...");
                this.reporterProxy.sendResults(resultsToSend.toArray(new client.ReportResult[0]));
                System.out.println("[INFO]: Results sent successfully.");
                resultsCache.emptyCache(reporterId);
            }
        }
        catch (Exception e){
            System.out.println("[INFO]: Error while sending results, dumping to cache...");
            e.printStackTrace();
            this.resultsCache.cacheResult(this.reporterId, resultsToSend);
        }
    }
}
