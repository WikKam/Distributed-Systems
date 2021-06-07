module client
{

    struct Time
    {
        int hour;
        int minute;
        int second;
    }
    
    struct ReportResult
    {
        Time reportTime;
        int resultTime;
        bool result;
	    string message;
    }

    sequence<ReportResult> ResultList;

    interface Reporter
    {
    	void sendResults(ResultList results);
    }
}
