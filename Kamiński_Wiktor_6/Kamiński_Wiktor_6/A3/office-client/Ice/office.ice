#include "client.ice"

module office
{
    struct ReportData
    {
        client::Time reportTime;
	    int reporterId;
    }
    
    interface OfficeService
    {
        int reportTaxReturn(ReportData data, int return);
	    int reportIdCardRequest(ReportData data, int age);
	    int reportTradePermissionRequest(ReportData data, int businessId);
	    void connect(int reporterId, client::Reporter* reporter);
    }
}
