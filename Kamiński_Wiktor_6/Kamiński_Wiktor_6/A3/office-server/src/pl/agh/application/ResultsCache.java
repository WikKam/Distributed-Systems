package pl.agh.application;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class ResultsCache {
    ConcurrentHashMap<Integer, List<client.ReportResult>> results = new ConcurrentHashMap<>();

    public List<client.ReportResult> getCachedResults(int reporterId){
        return results.containsKey(reporterId) ? results.get(reporterId) : new ArrayList<>();
    }

    public void cacheResult(int reporterId, client.ReportResult reportResult){
        results.computeIfAbsent(reporterId, k -> new ArrayList<>());
        results.get(reporterId).add(reportResult);
    }

    public void cacheResult(int reporterId, List<client.ReportResult> reportResults){
        reportResults.forEach(res -> this.cacheResult(reporterId, res));
    }

    public void emptyCache(int reporterId){
        if(results.containsKey(reporterId)){
            results.get(reporterId).clear();
        }
    }
}
