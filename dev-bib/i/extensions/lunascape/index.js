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

import LSDD from 'lsdd';
import LSLD from 'lsld';

Bibi.x({

    id: 'Lunascape',
    author: 'Lunascape Corporation',
    version: '0.7.0',

    LSLD: new LSLD({
        //debug: true,
        url: S['book'],
        key: U['key'] || '',
        worker: document.currentScript.src.replace(/[^\/]+$/, 'lsldw.js')
    })

})(function() {

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

    if(this.LSLD.debug) {
        O.log(`LSLD: Debug Mode`);
    } else {
        LSDD.setup();
        LSDD.addHandler(() => {
            I.note(`Error | エラー`, null);
            I.note = () => false;
            [R.Main, I.Veil].forEach(Ele => { Ele.style.transition = '.111s', Ele.style.opacity = 0; });
            setTimeout(() => {
                sML.forEach(O.HTML.querySelectorAll('body>*'))(Ele => { if(Ele != I.Veil && Ele != I.Notifier) O.Body.removeChild(Ele); });
                R.Main.innerHTML = R.Main.Book.innerHTML = '';
            }, 222);
            [Bibi, L, E, S].forEach(Obj => { for(const _ in Obj) if(typeof Obj[_] == 'function') Obj[_] = this.dummy; });
            for(const _ in R) if(/^(on|reset|render|layOut|turn)/.test(_) && typeof R[_] == 'function') R[_] = this.dummy;
            for(const Path in B.Package.Manifest.Items) {
                const Item = O.item({ Path: Path });
                ['URI', 'Src', 'src'].forEach(_ => URL.revokeObjectURL(Item[_]));
                Item.Path = Item.Content = Item.URI = Item.Src = Item.src = Item.id = '';
                if(Item.tagName) {
                    if(Item.parentElement) Item.parentElement.removeChild(Item);
                    Item.className = Item.style = '';
                }
            }
            B.Package.Manifest.Items = B.Package.Spine.Items = R.Items = R.NonLinearItems = R.Spreads = R.Pages = [];
            for(const _ in this.LSLD) delete this.LSLD[_];
            setTimeout(() => {
                O.HTML.className = sML.Environments.concat('notifier-shown').join(' ');
                O.HTML.style.height = O.Body.style.height = '';
                const ByeBye = I.Veil.byebye({
                    'en': `<span>Please Close DevTool</span> <span>and Reload Your Browser.</span>`,
                    'ja': `<span>開発ツールを閉じて</span><span>再読み込みしてください。</span>`
                });
                I.Veil.style.transition = '.333s', I.Veil.style.opacity = 1;
                Bibi = B = E = I = L = M = P = R = S = U = X = undefined;
                this.error(`>>>> ${ ByeBye.toUpperCase() } <<<<`);
            }, 333);
        });
        O.log(`Loaded (with LSDD).`, '</g>');
        O.log = O.error = this.dummy = () => Promise.reject().catch(() => false);
        this.error = console.error || function(EM) { throw EM; };
    }

})(function() {
})(function() {
});