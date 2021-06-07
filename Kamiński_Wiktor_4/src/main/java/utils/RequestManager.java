package utils;

import java.util.HashMap;
import java.util.Map;

public class RequestManager {
    private int count = 0;
    private Map<String, Long> idTimeMap = new HashMap<>();

    public int getNextId(){
        this.count++;
        return count;
    }

    public void addRequest(String id){
        idTimeMap.put(id + count, System.currentTimeMillis());
    }

    public long getRequestTime(String id){
        return idTimeMap.get(id);
    }
}
