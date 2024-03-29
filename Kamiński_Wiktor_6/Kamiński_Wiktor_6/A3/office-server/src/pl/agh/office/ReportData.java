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

public class ReportData implements java.lang.Cloneable,
                                   java.io.Serializable
{
    public client.Time reportTime;

    public int reporterId;

    public ReportData()
    {
        this.reportTime = new client.Time();
    }

    public ReportData(client.Time reportTime, int reporterId)
    {
        this.reportTime = reportTime;
        this.reporterId = reporterId;
    }

    public boolean equals(java.lang.Object rhs)
    {
        if(this == rhs)
        {
            return true;
        }
        ReportData r = null;
        if(rhs instanceof ReportData)
        {
            r = (ReportData)rhs;
        }

        if(r != null)
        {
            if(this.reportTime != r.reportTime)
            {
                if(this.reportTime == null || r.reportTime == null || !this.reportTime.equals(r.reportTime))
                {
                    return false;
                }
            }
            if(this.reporterId != r.reporterId)
            {
                return false;
            }

            return true;
        }

        return false;
    }

    public int hashCode()
    {
        int h_ = 5381;
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, "::office::ReportData");
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, reportTime);
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, reporterId);
        return h_;
    }

    public ReportData clone()
    {
        ReportData c = null;
        try
        {
            c = (ReportData)super.clone();
        }
        catch(CloneNotSupportedException ex)
        {
            assert false; // impossible
        }
        return c;
    }

    public void ice_writeMembers(com.zeroc.Ice.OutputStream ostr)
    {
        client.Time.ice_write(ostr, this.reportTime);
        ostr.writeInt(this.reporterId);
    }

    public void ice_readMembers(com.zeroc.Ice.InputStream istr)
    {
        this.reportTime = client.Time.ice_read(istr);
        this.reporterId = istr.readInt();
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, ReportData v)
    {
        if(v == null)
        {
            _nullMarshalValue.ice_writeMembers(ostr);
        }
        else
        {
            v.ice_writeMembers(ostr);
        }
    }

    static public ReportData ice_read(com.zeroc.Ice.InputStream istr)
    {
        ReportData v = new ReportData();
        v.ice_readMembers(istr);
        return v;
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, int tag, java.util.Optional<ReportData> v)
    {
        if(v != null && v.isPresent())
        {
            ice_write(ostr, tag, v.get());
        }
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, int tag, ReportData v)
    {
        if(ostr.writeOptional(tag, com.zeroc.Ice.OptionalFormat.VSize))
        {
            ostr.writeSize(16);
            ice_write(ostr, v);
        }
    }

    static public java.util.Optional<ReportData> ice_read(com.zeroc.Ice.InputStream istr, int tag)
    {
        if(istr.readOptional(tag, com.zeroc.Ice.OptionalFormat.VSize))
        {
            istr.skipSize();
            return java.util.Optional.of(ReportData.ice_read(istr));
        }
        else
        {
            return java.util.Optional.empty();
        }
    }

    private static final ReportData _nullMarshalValue = new ReportData();

    /** @hidden */
    public static final long serialVersionUID = -2999008111615755590L;
}
