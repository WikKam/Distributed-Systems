package pl.agh.application;


import client.ReportResult;
import client.ReporterPrx;
import com.zeroc.Ice.Current;
import office.ReportData;
import pl.agh.application.tasks.SendResultsTask;

import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class OfficeServiceImpl implements office.OfficeService {

    private final ConcurrentHashMap<Integer, ReporterPrx> connectedReporters = new ConcurrentHashMap<>();
    private final ResultsCache resultsCache = new ResultsCache();
    private final ExecutorService executorService = Executors.newCachedThreadPool();
    private final Random random = new Random();

    @Override
    public int reportTaxReturn(ReportData data, int _return, Current current) {
        boolean result = random.nextBoolean();
        System.out.println("[INFO]: Reporter with id: " + data.reporterId + " requested tax return.");
        int secondsToWait = random.nextInt(10) + 1;
        String resultMessage = result ? "Tax return granted" : "Tax return denied";
        client.ReportResult reportResult = new ReportResult(data.reportTime, secondsToWait, result, resultMessage);
        executorService.submit(new SendResultsTask(resultsCache, data.reporterId, connectedReporters.get(data.reporterId), secondsToWait, reportResult));
        return secondsToWait;
    }

    @Override
    public int reportIdCardRequest(ReportData data, int age, Current current) {
        boolean result = age > 18;
        System.out.println("[INFO]: Reporter with id: " + data.reporterId + " requested ID card.");
        int secondsToWait = random.nextInt(10) + 1;
        String resultMessage = result ? "ID card granted" : "ID card permission denied";
        client.ReportResult reportResult = new ReportResult(data.reportTime, secondsToWait, result, resultMessage);
        executorService.submit(new SendResultsTask(resultsCache, data.reporterId, connectedReporters.get(data.reporterId), secondsToWait, reportResult));
        return secondsToWait;
    }

    @Override
    public int reportTradePermissionRequest(ReportData data, int businessId, Current current) {
        boolean result = random.nextBoolean();
        System.out.println("[INFO]: Reporter with id: " + data.reporterId + " requested trade permission.");
        int secondsToWait = random.nextInt(10) + 1;
        String resultMessage = result ? "Trade permission granted" : "Trade permission denied";
        client.ReportResult reportResult = new ReportResult(data.reportTime, secondsToWait, result, resultMessage);
        executorService.submit(new SendResultsTask(resultsCache, data.reporterId, connectedReporters.get(data.reporterId), secondsToWait, reportResult));
        return secondsToWait;
    }

    @Override
    public void connect(int reporterId, ReporterPrx reporter, Current current) {
        System.out.println("[INFO]: Reporter with ID: " + reporterId + " connected.");
        ReporterPrx currentProxy = reporter.ice_fixed(current.con);
        connectedReporters.put(reporterId, currentProxy);
        executorService.submit(new SendResultsTask(resultsCache, reporterId, currentProxy));
    }
}
