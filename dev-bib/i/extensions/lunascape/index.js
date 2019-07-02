/*!
 *
 *  # BiB/i Extension: Lunascape Extension Bundle
 *
 *  * Copyright (c) Lunascape Corporation - https://www.lunascape.co.jp
 *  * All rights reserved.
 *
 *  * Including:
 *      - LSDD: Lunascape Devtools Detector
 *      - LSLD: Lunascape Loader
 *
 */

import LSDD from 'lsdd';// self.LSDD = LSDD;
import LSLD from 'lsld';

Bibi.x({

    id: 'Lunascape',
    author: 'Lunascape Corporation',
    version: '0.3.0',

    LSLD: new LSLD({ debug: true,
        url: S['book'],
        key: U['key'] || '',
        worker: document.currentScript.src.replace(/[^\/]+$/, 'lsldw.js')
    })

})(function() {

    if(!this.LSLD) return;

    O.isToBeExtractedIfNecessary = () => true;

    O.retlieve = (Item) => {
        Item = O.item(Item);
        return this.LSLD.getBuffer(Item.Path).then(ABuf => {
            if(O.isBin(Item)) Item.DataType = 'blob', Item.Content = new Blob([ABuf], { type: Item['media-type'] });
            else              Item.DataType = 'text', Item.Content = new TextDecoder("utf-8").decode(new Uint8Array(ABuf));
            return Item;
        }).catch(() => Promise.reject());
    };

    O.cancelRetlieving = (Item) => { try { setTimeout(() => this.LSLD.abort(Item.Path), 0); } catch(Err) {} };

});