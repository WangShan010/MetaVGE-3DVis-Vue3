// DevExtreme 框架
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import deMessages from 'devextreme/localization/messages/zh.json';
import {locale, loadMessages} from 'devextreme/localization';


const installDevextreme = function () {
    loadMessages(deMessages);
    locale(navigator.language);
};


export default installDevextreme;

