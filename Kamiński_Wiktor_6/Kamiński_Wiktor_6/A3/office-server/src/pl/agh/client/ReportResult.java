//
// Copyright (c) ZeroC, Inc. All rights reserved.
//
//
// Ice version 3.7.5
//
// <auto-generated>
//
// Generated from file `client.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

package client;

public class ReportResult implements java.lang.Cloneable,
                                     java.io.Serializable
{
    public Time reportTime;

    public int resultTime;

    public boolean result;

    public String message;

    public ReportResult()
    {
        this.reportTime = new Time();
        this.message = "";
    }

    public ReportResult(Time reportTime, int resultTime, boolean result, String message)
    {
        this.reportTime = reportTime;
        this.resultTime = resultTime;
        this.result = result;
        this.message = message;
    }

    public boolean equals(java.lang.Object rhs)
    {
        if(this == rhs)
        {
            return true;
        }
        ReportResult r = null;
        if(rhs instanceof ReportResult)
        {
            r = (ReportResult)rhs;
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
            if(this.resultTime != r.resultTime)
            {
                return false;
            }
            if(this.result != r.result)
            {
                return false;
            }
            if(this.message != r.message)
            {
                if(this.message == null || r.message == null || !this.message.equals(r.message))
                {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    public int hashCode()
    {
        int h_ = 5381;
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, "::client::ReportResult");
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, reportTime);
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, resultTime);
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, result);
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, message);
        return h_;
    }

    public ReportResult clone()
    {
        ReportResult c = null;
        try
        {
            c = (ReportResult)super.clone();
        }
        catch(CloneNotSupportedException ex)
        {
            assert false; // impossible
        }
        return c;
    }

    public void ice_writeMembers(com.zeroc.Ice.OutputStream ostr)
    {
        Time.ice_write(ostr, this.reportTime);
        ostr.writeInt(this.resultTime);
        ostr.writeBool(this.result);
        ostr.writeString(this.message);
    }

    public void ice_readMembers(com.zeroc.Ice.InputStream istr)
    {
        this.reportTime = Time.ice_read(istr);
        this.resultTime = istr.readInt();
        this.result = istr.readBool();
        this.message = istr.readString();
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, ReportResult v)
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

    static public ReportResult ice_read(com.zeroc.Ice.InputStream istr)
    {
        ReportResult v = new ReportResult();
        v.ice_readMembers(istr);
        return v;
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, int tag, java.util.Optional<ReportResult> v)
    {
        if(v != null && v.isPresent())
        {
            ice_write(ostr, tag, v.get());
        }
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, int tag, ReportResult v)
    {
        if(ostr.writeOptional(tag, com.zeroc.Ice.OptionalFormat.FSize))
        {
            int pos = ostr.startSize();
            ice_write(ostr, v);
            ostr.endSize(pos);
        }
    }

    static public java.util.Optional<ReportResult> ice_read(com.zeroc.Ice.InputStream istr, int tag)
    {
        if(istr.readOptional(tag, com.zeroc.Ice.OptionalFormat.FSize))
        {
            istr.skip(4);
            return java.util.Optional.of(ReportResult.ice_read(istr));
        }
        else
        {
            return java.util.Optional.empty();
        }
    }

    private static final ReportResult _nullMarshalValue = new ReportResult();

    /** @hidden */
    public static final long serialVersionUID = 3637654285833354960L;
}
