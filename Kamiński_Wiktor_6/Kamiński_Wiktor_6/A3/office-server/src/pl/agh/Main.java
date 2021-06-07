package pl.agh;

import com.zeroc.Ice.Communicator;
import com.zeroc.Ice.ObjectAdapter;
import com.zeroc.Ice.Util;
import pl.agh.application.OfficeServiceImpl;

public class Main {

    public static void main(String[] args) {
        try {
            Communicator communicator = Util.initialize(args);
            ObjectAdapter office = communicator.createObjectAdapter("Office");
            OfficeServiceImpl impl = new OfficeServiceImpl();
            office.add(impl, Util.stringToIdentity("OfficeService"));
            office.activate();
            System.out.println("[SERVER]: Init successful");
            communicator.waitForShutdown();
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
