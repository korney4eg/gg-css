/* global HTMLInputElement, HTMLSelectElement, navigator, alert */
/* eslint-disable react/jsx-max-depth */

import {SyntheticEvent, useState} from 'react';

import rawHtml from '../../../material/187145.html';

// import foreign styles
import style1 from '../../../material/187145_files/style-new.css';
import style2 from '../../../material/187145_files/style-new(1).css';

// <link href="./187145_files/style-new.css" rel="stylesheet" type="text/css">
// <link rel="stylesheet" type="text/css" href="./187145_files/style-new(1).css">
// <link rel="stylesheet" type="text/css" href="./187145_files/fonts.css">
// <link rel="stylesheet" href="./187145_files/channels_icons.css" media="all">
// <link rel="stylesheet" href="./187145_files/channels_smiles.css" media="all">
// <link rel="stylesheet" href="./187145_files/common_smiles.css" media="all">

console.log(style1);
console.log(style2);

console.log(rawHtml);

import styleClientHome from './client-home.scss';

type FontFamilyType = {
    letterForm: string;
    name: string;
};

const enum LetterFormEnum {
    cursive = 'cursive',
    monospace = 'monospace',
    sansSerif = 'sans-serif',
    serif = 'serif',
}

const fontFamilyMap: Array<FontFamilyType> = [
    {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        letterForm: LetterFormEnum.sansSerif,
        name: 'Open Sans',
    },
    {
        letterForm: LetterFormEnum.sansSerif,
        name: 'Hack Regular Nerd Font Complete',
    },
    {
        letterForm: LetterFormEnum.sansSerif,
        name: 'Arial',
    },
    {
        letterForm: LetterFormEnum.serif,
        name: 'Georgia',
    },
    {
        letterForm: LetterFormEnum.monospace,
        name: 'Courier New',
    },
    {
        letterForm: LetterFormEnum.cursive,
        name: 'Brush Script MT',
    },
];

export function ClientHome(): JSX.Element {
    const defaultFontSize = 14;
    const minFontSize = 12;
    const maxFontSize = 36;
    const [backgroundColor, setBackgroundColor] = useState<string>('#0a0d11');
    const [backgroundColorAlpha, setBackgroundColorAlpha] = useState<string>('255');
    const [isShowSendButton, setIsShowSendButton] = useState<boolean>(true);
    const [fontSize, setFontSize] = useState<number>(defaultFontSize);
    const [fontFamilyIndex, setFontFamilyIndex] = useState<number>(0);
    const [chatHeight, setChatHeight] = useState<number>(800);
    const [chatWidth, setChatWidth] = useState<number>(600);

    const css = `
/* Цвет фона окна чата. Для настройки прозрачности из единого места. */
:root {
  --new-bg-color: ${backgroundColor}${Number.parseInt(backgroundColorAlpha, 10).toString(16).padStart(2, '0')};
  --nick-color: #4e822b;
  --message-color: #7ff32f;
}

/* Эта секция для того, чтобы настроить прозрачный фон чатика. */
.chat-container { background-color: var(--new-bg-color); }
html { background-color: var(--new-bg-color); }

/* Настройка основных параметров окна чата */
div.chat-container {
    border-left: none !important;
    padding: 8px;
    background-color: var(--new-bg-color);
}

/* Скрытие сообщения дня и кнопки сообщения дня */
div.popup-wrap { display: none; }

/* Скрытие панели чата для ввода текста, смайлов и другие кнопки */
.chat-container .chat-control-block,
div.chat-control-block {
    display: ${isShowSendButton ? 'block' : 'none'};
    position: static;
    box-sizing: border-box;
    max-width: calc(100% - 18px);
    margin: 0;
    padding-bottom: 8px;
}

/* Маленький незаметный блок с красивым градиентом позади чата, он не нужен */
.chat-container .content-window .bg-block { display: none; }
.bg-block { display: none !important; }

/* После того, как спрятали полоску для ввода текста, растягиваем чатик вниз */
div.chat-container div.content-window {
    height: auto !important;
    border-left: 0;
}
.chat-container_new-guy .content-window { height: 100% !important; }
.chat-container .content-window { height: ${chatHeight}px !important; width: ${chatWidth} !important}

/* Скачиваем нужный шрифт */
@font-face {
    font-family: "Hack Regular Nerd Font Complete";
    src: url("https://raw.githubusercontent.com/ryanoasis/nerd-fonts/master/patched-fonts/Hack/Regular/complete/Hack%20Regular%20Nerd%20Font%20Complete.ttf");
}

/* Конфигурируем шрифт сообщений */
.chat-container .message-block .message {
    font-family: ${fontFamilyMap[fontFamilyIndex].name}, ${fontFamilyMap[fontFamilyIndex].letterForm};
    font-size: ${fontSize}px;
}

/* Конфигурируем шрифт ников */
.chat-container .nick {
    font-family: ${fontFamilyMap[fontFamilyIndex].name}, ${fontFamilyMap[fontFamilyIndex].letterForm};
    font-size: ${fontSize}px;
}

/* Настройка цвета текста в чате */
/*
.chat-container .message-block .message,
.chat-container .message-block.king .message,
p[_ngcontent-sud-c7] {
    color: var(--message-color);
}
*/

/* Настройка цвета ников в чате */
/*
.chat-container .nick.simple,
.chat-container .nick.bronze,
.chat-container .nick.silver,
.chat-container .nick.gold,
.chat-container .nick.diamond,
.chat-container .nick.king,
.chat-container .nick.top-one,
.chat-container .nick.undead,
.chat-container .nick.premium,
.chat-container .nick.premium-personal,
.chat-container .nick.moderator,
.chat-container .nick.newguy,
.chat-container .nick.streamer,
.chat-container .nick.streamer-helper,
donor,
your-nick {
    color: var(--nick-color);
}
*/
`;

    return (
        <div className={styleClientHome.home}>
            <div className={styleClientHome.home_container__left}>
                <form className={styleClientHome.home_form}>
                    <label>
                        <span>Размер чата:</span>
                        <input
                            defaultValue={chatWidth}
                            max="1500"
                            min="600"
                            onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
                                setChatWidth(Number.parseInt(evt.currentTarget.value, 10) || 600);
                            }}
                            type="number"
                        />
                        <input
                            defaultValue={chatHeight}
                            max="1500"
                            min="600"
                            onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
                                setChatHeight(Number.parseInt(evt.currentTarget.value, 10) || 800);
                            }}
                            type="number"
                        />
                    </label>
                    <label>
                        <span>Цвет фона:</span>
                        <input
                            defaultValue={backgroundColor}
                            onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
                                setBackgroundColor(evt.currentTarget.value);
                            }}
                            type="color"
                        />
                    </label>
                    <label>
                        <span>Процент прозрачности фона:</span>
                        <input
                            defaultValue={backgroundColorAlpha}
                            max="255"
                            min="0"
                            onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
                                setBackgroundColorAlpha(evt.currentTarget.value);
                            }}
                            step="1"
                            type="range"
                        />
                    </label>
                    <label>
                        <span>Показывать управляющие кнопки:</span>
                        <input
                            defaultChecked={isShowSendButton}
                            onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
                                setIsShowSendButton(evt.currentTarget.checked);
                            }}
                            style={{display: 'inline-block'}}
                            type="checkbox"
                        />
                    </label>
                    <label>
                        <span>Размер шрифта: {fontSize}</span>

                        <input
                            defaultValue={defaultFontSize}
                            max={maxFontSize}
                            min={minFontSize}
                            onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
                                setFontSize(Number.parseInt(evt.currentTarget.value, 10) || defaultFontSize);
                            }}
                            step="1"
                            type="range"
                        />
                    </label>
                    <label>
                        <span>Шрифт:</span>

                        <select
                            defaultValue={fontFamilyIndex}
                            onChange={(evt: SyntheticEvent<HTMLSelectElement>) => {
                                setFontFamilyIndex(Number.parseInt(evt.currentTarget.value, 10) || 0);
                            }}
                        >
                            {fontFamilyMap.map((fontFamilyItem: FontFamilyType, index: number): JSX.Element => {
                                return (
                                    <option key={fontFamilyItem.name} value={index}>
                                        {fontFamilyItem.name} ({fontFamilyItem.letterForm})
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label>
                        <button
                            onClick={async () => {
                                await navigator.clipboard.writeText(css);
                                // eslint-disable-next-line no-alert
                                alert('Стили скопированы');
                            }}
                            type="button"
                        >
                            Скопировать стили
                        </button>
                    </label>
                </form>

                <pre className={styleClientHome.home_result} key={css}>
                    <div>{css}</div>
                </pre>
            </div>

            <div className={styleClientHome.home_container__right}>
                <style
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{__html: css}}
                />
                <div
                    className="premium-icon-5"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{__html: rawHtml}}
                />
            </div>
        </div>
    );
}
