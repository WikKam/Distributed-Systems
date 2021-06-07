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

/* eslint-disable */
/* jshint ignore: start */

(function(module, require, exports)
{
    const Ice = require("ice").Ice;
    const _ModuleRegistry = Ice._ModuleRegistry;
    const client = require("./client").client;
    const Slice = Ice.Slice;

    let office = _ModuleRegistry.module("office");

    office.ReportData = class
    {
        constructor(reportTime = new client.Time(), reporterId = 0)
        {
            this.reportTime = reportTime;
            this.reporterId = reporterId;
        }

        _write(ostr)
        {
            client.Time.write(ostr, this.reportTime);
            ostr.writeInt(this.reporterId);
        }

        _read(istr)
        {
            this.reportTime = client.Time.read(istr, this.reportTime);
            this.reporterId = istr.readInt();
        }

        static get minWireSize()
        {
            return  16;
        }
    };

    Slice.defineStruct(office.ReportData, true, false);

    const iceC_office_OfficeService_ids = [
        "::Ice::Object",
        "::office::OfficeService"
    ];

    office.OfficeService = class extends Ice.Object
    {
    };

    office.OfficeServicePrx = class extends Ice.ObjectPrx
    {
    };

    Slice.defineOperations(office.OfficeService, office.OfficeServicePrx, iceC_office_OfficeService_ids, 1,
    {
        "reportTaxReturn": [, , , , [3], [[office.ReportData], [3]], , , , ],
        "reportIdCardRequest": [, , , , [3], [[office.ReportData], [3]], , , , ],
        "reportTradePermissionRequest": [, , , , [3], [[office.ReportData], [3]], , , , ],
        "connect": [, , , , , [[3], ["client.ReporterPrx"]], , , , ]
    });
    exports.office = office;
}
(typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? module : undefined,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? require :
 (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) ? self.Ice._require : window.Ice._require,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? exports :
 (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) ? self : window));
