//
// Copyright (c) ZeroC, Inc. All rights reserved.
//
//
// Ice version 3.7.5
//
// <auto-generated>
//
// Generated from file `office.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

package office;

public interface OfficeService extends com.zeroc.Ice.Object
{
    int reportTaxReturn(ReportData data, int _return, com.zeroc.Ice.Current current);

    int reportIdCardRequest(ReportData data, int age, com.zeroc.Ice.Current current);

    int reportTradePermissionRequest(ReportData data, int businessId, com.zeroc.Ice.Current current);

    void connect(int reporterId, client.ReporterPrx reporter, com.zeroc.Ice.Current current);

    /** @hidden */
    static final String[] _iceIds =
    {
        "::Ice::Object",
        "::office::OfficeService"
    };

    @Override
    default String[] ice_ids(com.zeroc.Ice.Current current)
    {
        return _iceIds;
    }

    @Override
    default String ice_id(com.zeroc.Ice.Current current)
    {
        return ice_staticId();
    }

    static String ice_staticId()
    {
        return "::office::OfficeService";
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_reportTaxReturn(OfficeService obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        ReportData iceP_data;
        int iceP_return;
        iceP_data = ReportData.ice_read(istr);
        iceP_return = istr.readInt();
        inS.endReadParams();
        int ret = obj.reportTaxReturn(iceP_data, iceP_return, current);
        com.zeroc.Ice.OutputStream ostr = inS.startWriteParams();
        ostr.writeInt(ret);
        inS.endWriteParams(ostr);
        return inS.setResult(ostr);
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_reportIdCardRequest(OfficeService obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        ReportData iceP_data;
        int iceP_age;
        iceP_data = ReportData.ice_read(istr);
        iceP_age = istr.readInt();
        inS.endReadParams();
        int ret = obj.reportIdCardRequest(iceP_data, iceP_age, current);
        com.zeroc.Ice.OutputStream ostr = inS.startWriteParams();
        ostr.writeInt(ret);
        inS.endWriteParams(ostr);
        return inS.setResult(ostr);
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_reportTradePermissionRequest(OfficeService obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        ReportData iceP_data;
        int iceP_businessId;
        iceP_data = ReportData.ice_read(istr);
        iceP_businessId = istr.readInt();
        inS.endReadParams();
        int ret = obj.reportTradePermissionRequest(iceP_data, iceP_businessId, current);
        com.zeroc.Ice.OutputStream ostr = inS.startWriteParams();
        ostr.writeInt(ret);
        inS.endWriteParams(ostr);
        return inS.setResult(ostr);
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_connect(OfficeService obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        int iceP_reporterId;
        client.ReporterPrx iceP_reporter;
        iceP_reporterId = istr.readInt();
        iceP_reporter = client.ReporterPrx.uncheckedCast(istr.readProxy());
        inS.endReadParams();
        obj.connect(iceP_reporterId, iceP_reporter, current);
        return inS.setResult(inS.writeEmptyParams());
    }

    /** @hidden */
    final static String[] _iceOps =
    {
        "connect",
        "ice_id",
        "ice_ids",
        "ice_isA",
        "ice_ping",
        "reportIdCardRequest",
        "reportTaxReturn",
        "reportTradePermissionRequest"
    };

    /** @hidden */
    @Override
    default java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceDispatch(com.zeroc.IceInternal.Incoming in, com.zeroc.Ice.Current current)
        throws com.zeroc.Ice.UserException
    {
        int pos = java.util.Arrays.binarySearch(_iceOps, current.operation);
        if(pos < 0)
        {
            throw new com.zeroc.Ice.OperationNotExistException(current.id, current.facet, current.operation);
        }

        switch(pos)
        {
            case 0:
            {
                return _iceD_connect(this, in, current);
            }
            case 1:
            {
                return com.zeroc.Ice.Object._iceD_ice_id(this, in, current);
            }
            case 2:
            {
                return com.zeroc.Ice.Object._iceD_ice_ids(this, in, current);
            }
            case 3:
            {
                return com.zeroc.Ice.Object._iceD_ice_isA(this, in, current);
            }
            case 4:
            {
                return com.zeroc.Ice.Object._iceD_ice_ping(this, in, current);
            }
            case 5:
            {
                return _iceD_reportIdCardRequest(this, in, current);
            }
            case 6:
            {
                return _iceD_reportTaxReturn(this, in, current);
            }
            case 7:
            {
                return _iceD_reportTradePermissionRequest(this, in, current);
            }
        }

        assert(false);
        throw new com.zeroc.Ice.OperationNotExistException(current.id, current.facet, current.operation);
    }
}
