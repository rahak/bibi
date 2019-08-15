/*!
 *
 *  # BiB/i Extension: Pegasus Extension Bundle
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

    id: 'Pegasus',
    author: 'Lunascape Corporation',
    version: '0.8.0',

    LSLD: new LSLD({
        url: S['book'],
        key: U['key'] || '',
        worker: document.currentScript.src.replace(/[^\/]+$/, 'lsldw.js')
    })

})(function() {

    O.isToBeExtractedIfNecessary = () => true;

    O.retlieve = (Item) => {
        Item = O.item(Item);
        return this.LSLD.getBuffer(Item.Path).then(ABuf => {
            if(O.isBin(Item)) Item.DataType = 'Blob', Item.Content = new Blob([ABuf], { type: Item['media-type'] });
            else              Item.DataType = 'Text', Item.Content = new TextDecoder('utf-8').decode(new Uint8Array(ABuf));
            return Item;
        }).catch(() => Promise.reject());
    };

    O.cancelRetlieving = (Item) => { try { this.LSLD.abort(Item.Path); } catch(Err) {} };

    if(true) return O.log(`LSLD: Debug Mode`);

    O.log(`Loaded (with LSDD).`, '</g>');
    O.log = O.error = this.dummy = () => Promise.reject().catch(() => false);
    this.error = console.error || function(EM) { throw EM; };

    LSDD.setup(), LSDD.addHandler(() => {
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
            ['URI', 'BlobURL', 'src'].forEach(_ => URL.revokeObjectURL(Item[_]));
            Item.Path = Item.Content = Item.URI = Item.BlobURL = Item.src = Item.id = '';
            if(Item.tagName) {
                if(Item.parentElement) Item.parentElement.removeChild(Item);
                Item.id = Item.className = Item.style = '';
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
            Bibi = B = C = E = I = L = M = P = R = S = U = X = undefined;
            this.error(`>>>> ${ ByeBye.toUpperCase() } <<<<`);
        }, 333);
    });

    ['select-elements', 'save-images', 'use-contextmenu'].forEach(Par => this[Par] = 'prevent');
    const VPs = ['-webkit-', '-moz-', '-ms-', ''], unaccessibilize = (Item) => {
        if(this['select-elements'] == 'prevent') {
            VPs.forEach(Prefix => {
                ['user-select', 'user-drag'].forEach(Property => Item.Body.style[Prefix + Property] = 'none');
            });
        }
        if(this['save-images'] == 'prevent') sML.forEach(Item.Body.querySelectorAll('img, svg, image'))(Img => {
            VPs.forEach(Prefix => {
                ['user-select', 'user-drag'].forEach(Property => Img.style[Prefix + Property] = 'none');
                if(O.Touch) Img.style[Prefix + 'pointer-events'] = 'none';
            });
            Img.draggable = false;
            Img.addEventListener('contextmenu', O.preventDefault);
        });
        if(this['use-contextmenu'] == 'prevent') {
            Item.contentDocument.addEventListener('contextmenu', O.preventDefault);
        }
    };
    unaccessibilize(O), E.bind('bibi:postprocessed-item', unaccessibilize);

})(function() {
})(function() {
});