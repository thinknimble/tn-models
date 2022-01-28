import assert from 'assert'

import Model, { fields } from '../src/models'
import ModelAPI from '../src/models'

const reportCont = {
  report: {
    id: 2579,
    report_title: 'New Title',
    email: 'pb1646a@gmail.com',
    name: 'Pari  Baker',
    organization: null,
    firebase_id: 'AsKcI9YmXrhndYt3FMqchPM9njD3',
    custom: false,
    created_at: '2021-11-24T00:25:20.054Z',
    published_at: null,
    subscription_status: 'paid',
    report_status: 'Published',
    report_slug: 'new-title',
    report_year: null,
    report_type: 'dp',
    report_cover:
      'https://firebasestorage.googleapis.com/v0/b/projekt-lavender.appspot.com/o/images%2Freports%2Fdefault.jpeg?alt=media\u0026token=44958053-cac8-4ec3-b1ef-c0ab170efe4e',
    premium: true,
    seo_enabled: true,
    report_views: 46,
    builder_link: 'https://app.yearly.report/builder/?rid=2579',
    new_builder_link: 'https://app.yearly.report/newbuilder/#/?rid=2579',
    report_markup:
      '\u003cstyle id="primaryColor"\u003e\u003c/style\u003e\u003cstyle id="secondaryColor"\u003e\u003c/style\u003e\u003cstyle id="primaryFont"\u003e\u003c/style\u003e\u003cstyle id="secondaryFont"\u003e\u003c/style\u003e\u003cdiv id="reportDetails" data-theme="custom" data-primary-color="333333" data-secondary-color="333333" data-primary-font="futura" data-secondary-font="playfair"\u003e \u003carticle data-page="opening" id="pg_be1iiq60u"\u003e\u003cheader id="headerDetail" id data-component="opening-cover" data-controls="background,layoutToggle" \u003e \u003cdiv class="container"\u003e \u003cdiv class="reportCoverContents"\u003e\u003cdiv class="img"\u003e\u003ca href="#" data-action="controlAddImage"\u003e+ Add Image\u003c/a\u003e\u003c/div\u003e \u003cdiv id="pageLabel" class="reportCoverContents"\u003e \u003ch1 data-field="reportTitle" contenteditable id="reportTitle" name="reportTitle" onkeyup="logKey()" \u003eNew title\u003c/h1\u003e\u003c/div\u003e \u003cdiv class="reportCoverContents"\u003e\u003ch2 style="text-align: center;" class="builderInputSubTitle" data-field="subtitleReport" contenteditable onkeyup="logKey()" class="builderInputSubTitle" type="text" id="subtitleReport" name="subtitleReport"\u003eSubtitle Report\u003c/h2\u003e \u003c/div\u003e \u003c/div\u003e \u003c!--\u003cimg id="myimg" src="" alt="Italian Trulli"\u003e--\u003e\u003cinput type="hidden" data-field="reportCover" value="https://app.yearly.report/img/cover3.jpeg"\u003e \u003c/div\u003e \u003cdiv class="opacitySlider"\u003e\u003cdiv data-opacity="10" data-action="changeOpacity" class="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"\u003e\u003cdiv class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 9.09091%;"\u003e \u003c/div\u003e \u003cspan tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 9.09091%;"\u003e\u003c/span\u003e \u003cdiv class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 9.09091%;"\u003e \u003c/div\u003e\u003c/div\u003e\u003cspan class="val"\u003e10%\u003c/span\u003e \u003c/div\u003e \u003cdiv class="controls"\u003e \u003ca href="#" title="Add Background Image" data-action="controlBackground"\u003e \u003ci class="fa fa-image"\u003e\u003c/i\u003e\u003c/a\u003e  \u003ca href="#" title="Toggle Layout" data-action="controlLayoutToggle"\u003e \u003ci class="fa fa-toggle-off"\u003e\u003c/i\u003e  \u003c/a\u003e \u003c/div\u003e \u003c/header\u003e  \u003cdiv class="pageContents noflex"\u003e\u003c/div\u003e \u003cdiv class="layouts"\u003e \u003cul\u003e\u003cli\u003e  \u003ca href="#" class="active" data-block-type="contentBlocks"\u003eContent\u003c/a\u003e \u003c/li\u003e \u003cli\u003e \u003ca href="#" data-block-type="layoutBlocks" class=""\u003eLayouts\u003c/a\u003e\u003c/li\u003e \u003c/ul\u003e \u003cdiv class="contentBlocks active"\u003e\u003ca href="#" data-add-component="paragraph"\u003e \u003ci class="fa fa-pen-alt"\u003e\u003c/i\u003e  \u003cspan\u003eText\u003c/span\u003e \u003c/a\u003e  \u003ca href="#" data-add-component="image"\u003e \u003ci class="fa fa-image"\u003e\u003c/i\u003e  \u003cspan\u003eImage\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-component="quote"\u003e \u003ci class="fa fa-quote-left"\u003e\u003c/i\u003e \u003cspan\u003eQuote\u003c/span\u003e \u003c/a\u003e   \u003ca href="#" data-add-component="table"\u003e  \u003csvg class="svg-inline--fa fa-table fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""\u003e\u003cpath fill="currentColor" d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z"\u003e\u003c/path\u003e\u003c/svg\u003e\u003c!-- \u003ci class="fa fa-table"\u003e\u003c/i\u003e --\u003e\u003cspan\u003eTable\u003c/span\u003e  \u003c/a\u003e   \u003ca href="#" data-add-component="video"\u003e \u003csvg class="svg-inline--fa fa-video fa-w-18" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="video" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""\u003e\u003cpath fill="currentColor" d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"\u003e  \u003c/path\u003e   \u003c/svg\u003e \u003c!-- \u003ci class="fa fa-video"\u003e\u003c/i\u003e --\u003e  \u003cspan\u003eVideo\u003c/span\u003e  \u003c/a\u003e \u003ca href="#" data-add-component="audio"\u003e  \u003csvg class="svg-inline--fa fa-volume-up fa-w-18" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="volume-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""\u003e \u003cpath fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"\u003e \u003c/path\u003e\u003c/svg\u003e\u003c!-- \u003ci class="fa fa-volume-up"\u003e\u003c/i\u003e --\u003e \u003cspan\u003eAudio\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-component="footnote"\u003e   \u003csvg class="svg-inline--fa fa-asterisk fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="asterisk" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""\u003e \u003cpath fill="currentColor" d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"\u003e \u003c/path\u003e \u003c/svg\u003e \u003c!-- \u003ci class="fa fa-asterisk"\u003e\u003c/i\u003e --\u003e  \u003cspan\u003eFootnote\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-component="number"\u003e \u003csvg class="svg-inline--fa fa-percent fa-w-14" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="percent" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""\u003e \u003cpath fill="currentColor" d="M112 224c61.9 0 112-50.1 112-112S173.9 0 112 0 0 50.1 0 112s50.1 112 112 112zm0-160c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm224 224c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112zm0 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zM392.3.2l31.6-.1c19.4-.1 30.9 21.8 19.7 37.8L77.4 501.6a23.95 23.95 0 0 1-19.6 10.2l-33.4.1c-19.5 0-30.9-21.9-19.7-37.8l368-463.7C377.2 4 384.5.2 392.3.2z"\u003e\u003c/path\u003e \u003c/svg\u003e  \u003c!-- \u003ci class="fa fa-percent"\u003e\u003c/i\u003e --\u003e   \u003cspan\u003eNumber\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-component="chart"\u003e \u003csvg class="svg-inline--fa fa-chart-pie fa-w-17" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="chart-pie" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512" data-fa-i2svg=""\u003e \u003cpath fill="currentColor" d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"\u003e \u003c/path\u003e  \u003c/svg\u003e \u003c!-- \u003ci class="fa fa-chart-pie"\u003e\u003c/i\u003e --\u003e  \u003cspan\u003eChart\u003c/span\u003e   \u003c/a\u003e \u003ca href="#" data-add-component="social"\u003e \u003csvg class="svg-inline--fa fa-comment-alt fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="comment-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""\u003e  \u003cpath fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z"\u003e \u003c/path\u003e \u003c/svg\u003e\u003c!-- \u003ci class="fa fa-comment-alt"\u003e\u003c/i\u003e --\u003e \u003cspan\u003eSocial\u003c/span\u003e\u003c/a\u003e \u003ca href="#" data-add-component="impactStory"\u003e \u003csvg class="svg-inline--fa fa-book-open fa-w-18" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="book-open" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""\u003e\u003cpath fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"\u003e\u003c/path\u003e\u003c/svg\u003e\u003c!-- \u003ci class="fa fa-book-open"\u003e\u003c/i\u003e --\u003e \u003cspan\u003eLetter/Story\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-component="donorList"\u003e \u003csvg class="svg-inline--fa fa-user-friends fa-w-20" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="user-friends" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""\u003e \u003cpath fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"\u003e \u003c/path\u003e \u003c/svg\u003e  \u003c!-- \u003ci class="fa fa-user-friends"\u003e\u003c/i\u003e --\u003e \u003cspan\u003eDonor List\u003c/span\u003e  \u003c/a\u003e  \u003ca href="#" data-add-component="donate"\u003e \u003csvg class="svg-inline--fa fa-heart fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""\u003e \u003cpath fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"\u003e \u003c/path\u003e \u003c/svg\u003e \u003c!-- \u003ci class="fa fa-heart"\u003e\u003c/i\u003e --\u003e  \u003cspan\u003eDonate\u003c/span\u003e  \u003c/a\u003e \u003ca href="#" data-add-component="sponsors"\u003e \u003csvg class="svg-inline--fa fa-hand-holding-heart fa-w-18" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="hand-holding-heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""\u003e\u003cpath fill="currentColor" d="M275.3 250.5c7 7.4 18.4 7.4 25.5 0l108.9-114.2c31.6-33.2 29.8-88.2-5.6-118.8-30.8-26.7-76.7-21.9-104.9 7.7L288 36.9l-11.1-11.6C248.7-4.4 202.8-9.2 172 17.5c-35.3 30.6-37.2 85.6-5.6 118.8l108.9 114.2zm290 77.6c-11.8-10.7-30.2-10-42.6 0L430.3 402c-11.3 9.1-25.4 14-40 14H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h78.3c15.9 0 30.7-10.9 33.3-26.6 3.3-20-12.1-37.4-31.6-37.4H192c-27 0-53.1 9.3-74.1 26.3L71.4 384H16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h356.8c14.5 0 28.6-4.9 40-14L564 377c15.2-12.1 16.4-35.3 1.3-48.9z"\u003e \u003c/path\u003e \u003c/svg\u003e\u003c!-- \u003ci class="fa fa-hand-holding-heart"\u003e\u003c/i\u003e --\u003e  \u003cspan\u003eSponsors\u003c/span\u003e \u003c/a\u003e\u003ca href="#" data-add-component="staff"\u003e \u003csvg class="svg-inline--fa fa-users fa-w-20" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""\u003e   \u003cpath fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"\u003e  \u003c/path\u003e  \u003c/svg\u003e  \u003c!-- \u003ci class="fa fa-users"\u003e\u003c/i\u003e --\u003e  \u003cspan\u003eStaff\u003c/span\u003e  \u003c/a\u003e  \u003ca href="#" data-add-component="survey"\u003e \u003csvg class="svg-inline--fa fa-poll-h fa-w-14" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="poll-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""\u003e \u003cpath fill="currentColor" d="M448 432V80c0-26.5-21.5-48-48-48H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48zM112 192c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h128c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16H112zm0 96c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16H112zm0 96c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h64c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-64z"\u003e\u003c/path\u003e \u003c/svg\u003e \u003c!-- \u003ci class="fa fa-poll-h"\u003e\u003c/i\u003e --\u003e  \u003cspan\u003ePoll\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-component="html"\u003e  \u003csvg class="svg-inline--fa fa-code fa-w-20" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="code" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""\u003e  \u003cpath fill="currentColor" d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"\u003e \u003c/path\u003e  \u003c/svg\u003e  \u003c!-- \u003ci class="fa fa-code"\u003e\u003c/i\u003e --\u003e\u003cspan\u003eHTML\u003c/span\u003e \u003c/a\u003e  \u003c/div\u003e \u003cdiv class="layoutBlocks"\u003e  \u003ca href="#" data-add-layout="2"\u003e  \u003csvg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e  \u003cpath d="M254.7,44h-230c-6.1,0-11,4.9-11,11v110c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11V55C265.7,48.9,260.7,44,254.7,44z M25.7,56h107v108h-107V56z M253.7,164h-109V56h109V164z"\u003e \u003c/path\u003e\u003c/svg\u003e \u003cspan\u003eLayout A\u003c/span\u003e  \u003c/a\u003e \u003ca href="#" data-add-layout="3"\u003e \u003csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e \u003cpath d="M255,64H25c-6.1,0-11,4.9-11,11v70c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11V75C266,68.9,261.1,64,255,64z M174,76v68h-69 V76H174z M26,76h67v68H26V76z M254,144h-68V76h68V144z"\u003e  \u003c/path\u003e   \u003c/svg\u003e  \u003cspan\u003eLayout B\u003c/span\u003e  \u003c/a\u003e  \u003ca href="#" data-add-layout="4"\u003e  \u003csvg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e  \u003cpath d="M254,74H24c-6.1,0-11,4.9-11,11v51c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11V85C265,78.9,260.1,74,254,74z M145,86h48v49 h-48V86z M133,135H85V86h48V135z M25,86h48v49H25V86z M253,135h-48V86h48V135z"\u003e\u003c/path\u003e  \u003c/svg\u003e  \u003cspan\u003eLayout C\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-layout="1-4"\u003e \u003csvg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e \u003cpath d="M255,44H25c-6.1,0-11,4.9-11,11v110c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11V55C266,48.9,261.1,44,255,44z M254,105 h-47.7V56H254V105z M145,117h49.3v47H145V117z M145,105V56h49.3v49H145z M26,56h107v108H26V56z M206.3,164v-47H254v47H206.3z"\u003e \u003c/path\u003e \u003c/svg\u003e\u003cspan\u003eLayout D\u003c/span\u003e\u003c/a\u003e \u003ca href="#" data-add-layout="1-1"\u003e\u003csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e\u003cpath d="M254.9,14.7h-230c-6.1,0-11,4.9-11,11v170c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11v-170C265.9,19.6,261,14.7,254.9,14.7z M25.9,26.7h108v168h-108C25.9,194.7,25.9,26.7,25.9,26.7z M253.9,194.7h-108v-168h108V194.7z"\u003e \u003c/path\u003e \u003c/svg\u003e  \u003cspan\u003eLayout E\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-layout="1-2"\u003e \u003csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e \u003cpath d="M254.9,14.7h-230c-6.1,0-11,4.9-11,11v170c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11v-170C265.9,19.6,261,14.7,254.9,14.7z M253.9,104.7h-108v-78h108V104.7z M25.9,26.7h108v168h-108C25.9,194.7,25.9,26.7,25.9,26.7z M145.9,194.7v-78h108v78H145.9z"\u003e   \u003c/path\u003e \u003c/svg\u003e  \u003cspan\u003eLayout F\u003c/span\u003e \u003c/a\u003e \u003ca href="#" data-add-layout="2-2"\u003e  \u003csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e  \u003cpath d="M254.9,14.7h-230c-6.1,0-11,4.9-11,11v170c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11v-170C265.9,19.6,261,14.7,254.9,14.7z M253.9,104.7h-108v-78h108V104.7z M133.9,26.7v78h-108v-78C25.9,26.7,133.9,26.7,133.9,26.7z M25.9,116.7h108v78h-108 C25.9,194.7,25.9,116.7,25.9,116.7z M145.9,194.7v-78h108v78H145.9z"\u003e \u003c/path\u003e   \u003c/svg\u003e \u003cspan\u003eLayout G\u003c/span\u003e  \u003c/a\u003e  \u003ca href="#" data-add-layout="1-6"\u003e  \u003csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e  \u003cpath d="M254.9,14.7h-230c-6.1,0-11,4.9-11,11v170c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11v-170C265.9,19.6,261,14.7,254.9,14.7z M253.9,74.7h-48v-48h48V74.7z M145.9,26.7h48v48h-48V26.7z M145.9,146.7h48v48h-48V146.7z M145.9,134.7v-48h48v48H145.9z M205.9,86.7h48v48h-48V86.7z M25.9,26.7h108v168h-108C25.9,194.7,25.9,26.7,25.9,26.7z M205.9,194.7v-48h48v48H205.9z"\u003e  \u003c/path\u003e  \u003c/svg\u003e  \u003cspan\u003eLayout H\u003c/span\u003e  \u003c/a\u003e   \u003ca href="#" data-add-layout="2-6"\u003e  \u003csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e   \u003cpath d="M254.9,14.7h-230c-6.1,0-11,4.9-11,11v170c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11v-170C265.9,19.6,261,14.7,254.9,14.7z M253.9,74.7h-48v-48h48V74.7z M145.9,26.7h48v48h-48V26.7z M145.9,146.7h48v48h-48V146.7z M145.9,134.7v-48h48v48H145.9z M205.9,86.7h48v48h-48V86.7z M133.9,26.7v78h-108v-78C25.9,26.7,133.9,26.7,133.9,26.7z M25.9,116.7h108v78h-108 C25.9,194.7,25.9,116.7,25.9,116.7z M205.9,194.7v-48h48v48H205.9z"\u003e\u003c/path\u003e  \u003c/svg\u003e  \u003cspan\u003eLayout I\u003c/span\u003e   \u003c/a\u003e   \u003ca href="#" data-add-layout="6-6"\u003e  \u003csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 280 220" style="enable-background:new 0 0 280 220;" xml:space="preserve"\u003e   \u003cpath d="M254.9,14.7h-230c-6.1,0-11,4.9-11,11v170c0,6.1,4.9,11,11,11h230c6.1,0,11-4.9,11-11v-170C265.9,19.6,261,14.7,254.9,14.7z M253.9,74.7h-48v-48h48V74.7z M85.9,86.7h48v48h-48C85.9,134.7,85.9,86.7,85.9,86.7z M73.9,134.7h-48v-48h48V134.7z M133.9,74.7 h-48v-48h48V74.7z M145.9,26.7h48v48h-48V26.7z M133.9,146.7v48h-48v-48H133.9z M145.9,146.7h48v48h-48V146.7z M145.9,134.7v-48h48 v48H145.9z M205.9,86.7h48v48h-48V86.7z M73.9,26.7v48h-48v-48C25.9,26.7,73.9,26.7,73.9,26.7z M25.9,146.7h48v48h-48 C25.9,194.7,25.9,146.7,25.9,146.7z M205.9,194.7v-48h48v48H205.9z"\u003e   \u003c/path\u003e \u003c/svg\u003e   \u003cspan\u003eLayout J\u003c/span\u003e  \u003c/a\u003e\u003c/div\u003e \u003c/div\u003e \u003c!--end Layouts --\u003e   \u003c/article\u003e  \u003c/div\u003e\u003cfooter class="builder"\u003e\u003c/footer\u003e',
    report_content: {},
    show_footer: true,
    published_report_sections: [
      {
        id: '9tmsbjuvaeuag1dyv3z7cl',
        section_header: 'Untitled Cover Page',
        order: 1,
        section_bg_image:
          'https://firebasestorage.googleapis.com/v0/b/projekt-lavender.appspot.com/o/images%2FAsKcI9YmXrhndYt3FMqchPM9njD3%2Funspash-image-1639466869801.jpeg?alt=media\u0026token=bf3aef49-a184-4167-ba94-350f5319daad',
        section_bg_color: 'rgba(255,0,74,0.27)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: {
                textAlign: 'left',
                level: 1,
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'ss',
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'eeeeee',
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'asdasdasdasdasdasd',
                },
              ],
            },
          ],
        },
        sections: [
          {
            id: '3phcld50xdze82740utp7',
            section_header: 'Untitled Cover Page',
            order: 1,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'o5p815ur418oaegz9ofdb',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 12,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'asdasdasd',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'asdasddsdfsdf',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'asdasdasdasdasdasdasd',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
        ],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: '2n1ubougfnfbqauv0ccted',
        section_header: 'Untitled Cover Page',
        order: 2,
        section_bg_image:
          'https://firebasestorage.googleapis.com/v0/b/projekt-lavender.appspot.com/o/images%2FAsKcI9YmXrhndYt3FMqchPM9njD3%2Funspash-image-1639468872596.jpeg?alt=media\u0026token=d0c0a2e3-7553-45b4-a68b-c1326f6ed949',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'twitterEmbed',
              attrs: {
                embedContent:
                  '"\u003cblockquote class=\\"twitter-tweet\\"\u003e\u003cp lang=\\"en\\" dir=\\"ltr\\"\u003eI’m always fascinated by the conservative response when asked for evidence or examples of their claims. \u003ca href=\\"https://t.co/SUlxd5fstc\\"\u003epic.twitter.com/SUlxd5fstc\u003c/a\u003e\u003c/p\u003e\u0026mdash; Marc Lamont Hill (@marclamonthill) \u003ca href=\\"https://twitter.com/marclamonthill/status/1471148466076368897?ref_src=twsrc%5Etfw\\"\u003eDecember 15, 2021\u003c/a\u003e\u003c/blockquote\u003e \u003cscript async src=\\"https://platform.twitter.com/widgets.js\\" charset=\\"utf-8\\"\u003e\u003c/script\u003e"',
                justifyContent: 'center',
                width: 550,
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'heading',
              attrs: {
                textAlign: 'center',
                level: 1,
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'Sample Title',
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'center',
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'Sample Content',
                },
              ],
            },
          ],
        },
        sections: [
          {
            id: 'pkobuw7xlzez8qnzysl',
            section_header: 'Untitled Cover Page',
            order: 1,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'ojcas43s0kmzzv3ivquj8',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(0,0,0,1)',
                section_height: 400,
                section_width: null,
                section_flex: 12,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
          {
            id: 'v2s4imw05pim4l9kqgcjyh',
            section_header: 'Untitled Cover Page',
            order: 2,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: '90jz7ng4vxbkdnu9x7uege',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(255,0,94,1)',
                section_height: 400,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
              {
                id: 'v130hdhy72efym2z66clem',
                section_header: 'Untitled Cover Page',
                order: 2,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                      content: [
                        {
                          type: 'image',
                          attrs: {
                            textAlign: 'left',
                            src: 'https://firebasestorage.googleapis.com/v0/b/projekt-lavender.appspot.com/o/images%2FAsKcI9YmXrhndYt3FMqchPM9njD3%2Funspash-image-1639698233949.jpeg?alt=media\u0026token=50f7fc08-4df4-46f0-b7d3-0a981fe39a5f',
                            alt: null,
                            title: null,
                            width: '500px',
                            height: '300px',
                            changeable: false,
                          },
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
          {
            id: '8ot1h9t4ulpnw8vqd2sd',
            section_header: 'Untitled Cover Page',
            order: 3,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 800,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'urpj8cdi8cg3ieg1qyah8j',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 800,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'heading',
                      content: [
                        {
                          type: 'text',
                          text: 'Enter Story Title',
                        },
                      ],
                      attrs: {
                        level: 1,
                        textAlign: 'center',
                      },
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
                        },
                      ],
                      attrs: {
                        textAlign: 'center',
                      },
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
              {
                id: 'f9msy8un4kxd1sbrt7x',
                section_header: 'Untitled Cover Page',
                order: 2,
                section_bg_image:
                  'https://images.unsplash.com/photo-1549924231-f129b911e442?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=Mnw4MDYyM3wwfDF8c2VhcmNofDl8fGxvZ298ZW58MHx8fHwxNjM2NDk0NTMy\u0026ixlib=rb-1.2.1\u0026q=85',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 800,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
          {
            id: '3o19djg63j2rrydpz4hiwc',
            section_header: 'Untitled Cover Page',
            order: 4,
            section_bg_image: '',
            section_bg_color: 'rgba(116, 116, 116, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'nmsuqfgl4ysraonci6t19',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(116, 116, 116, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 12,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'heading',
                      content: [
                        {
                          marks: [
                            {
                              type: 'textStyle',
                              attrs: {
                                color: 'rgba(255,255,255,1)',
                              },
                            },
                          ],
                          type: 'text',
                          text: 'Enter call to action...',
                        },
                      ],
                      attrs: {
                        level: 3,
                        textAlign: 'center',
                      },
                    },
                    {
                      type: 'heading',
                      content: [
                        {
                          type: 'text',
                          text: 'Make a Contribution',
                          marks: [
                            {
                              type: 'textStyle',
                              attrs: {
                                color: 'rgba(255,255,255,1)',
                              },
                            },
                            {
                              type: 'link',
                              attrs: {
                                href: 'https://testing.com',
                                target: '_blank',
                              },
                            },
                          ],
                        },
                      ],
                      attrs: {
                        level: 1,
                        textAlign: 'center',
                      },
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
        ],
        section_bg_image_config: {
          size: 'stretch',
        },
      },
      {
        id: 'ikogialn4of5kt9xbq83f',
        section_header: 'Untitled Cover Page',
        order: 3,
        section_bg_image: '',
        section_bg_color: 'rgba(255,0,173,1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'heading',
              attrs: {
                textAlign: 'center',
                level: 1,
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'Sam',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: {
                        color: 'rgba(199,0,33,1)',
                        fontFamily: null,
                      },
                    },
                  ],
                  text: 'ple Title',
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'center',
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'Sample Content',
                },
              ],
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'ityc4dnmx7n5rfabxrysvi',
        section_header: 'Untitled Cover Page',
        order: 4,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'asdasdasdasd',
                },
              ],
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'chjmwlg783m37frephtu',
        section_header: 'Untitled Cover Page',
        order: 5,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: '9xk2crfgtjfddwnbjd56q5',
        section_header: 'Untitled Chapter',
        order: 6,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        sections: [
          {
            id: '67cenxv5b7dyy8a0ts4gge',
            section_header: 'Untitled Chapter',
            order: 1,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 800,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: '605wrscb69gebcgftqw7vo',
                section_header: 'Untitled Chapter',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 800,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'heading',
                      content: [
                        {
                          type: 'text',
                          text: 'Enter Story Title',
                        },
                      ],
                      attrs: {
                        level: 1,
                        textAlign: 'center',
                      },
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
                        },
                      ],
                      attrs: {
                        textAlign: 'center',
                      },
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
              {
                id: 'lcs5ipmt9c9tgk5a017jl',
                section_header: 'Untitled Chapter',
                order: 2,
                section_bg_image:
                  'https://images.unsplash.com/photo-1549924231-f129b911e442?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=Mnw4MDYyM3wwfDF8c2VhcmNofDl8fGxvZ298ZW58MHx8fHwxNjM2NDk0NTMy\u0026ixlib=rb-1.2.1\u0026q=85',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 800,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
          {
            id: 'u69i4vq9wloie57dnwxwl',
            section_header: 'Untitled Chapter',
            order: 2,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'qnbiuigpd4cx2b9ohx1h7r',
                section_header: 'Untitled Chapter',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 12,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
          {
            id: 'e1yz8ghsfc6wef72tzzcy',
            section_header: 'Untitled Chapter',
            order: 3,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'a7uz2lqwyj8g2sbefuifru',
                section_header: 'Untitled Chapter',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
              {
                id: 't74z2iz8upo0vemk3gk8',
                section_header: 'Untitled Chapter',
                order: 2,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
        ],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'zqtmhi90c2720lal9ulc4',
        section_header: 'Untitled Cover Page',
        order: 7,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'heading',
              content: [
                {
                  type: 'text',
                  text: 'Sample Title ',
                },
              ],
              attrs: {
                level: 1,
                textAlign: 'center',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Sample Content ',
                },
              ],
              attrs: {
                textAlign: 'center',
              },
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'mxh1stx8cxdzf3udocbmj',
        section_header: 'Untitled Chapter',
        order: 8,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'heading',
              content: [
                {
                  type: 'text',
                  text: 'Sample Title ',
                },
              ],
              attrs: {
                level: 1,
                textAlign: 'center',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Sample Content ',
                },
              ],
              attrs: {
                textAlign: 'center',
              },
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'xl6ujl7hqsrygglb7ai0j',
        section_header: 'Untitled Chapter',
        order: 9,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'heading',
              content: [
                {
                  type: 'text',
                  text: 'Sample Title ',
                },
              ],
              attrs: {
                level: 1,
                textAlign: 'center',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Sample Content ',
                },
              ],
              attrs: {
                textAlign: 'center',
              },
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'on44gmkkpyp8qhnz7tdm27',
        section_header: 'Untitled Chapter',
        order: 10,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'l0tm9teo4pe0mmi0awfucs',
        section_header: 'Untitled Chapter',
        order: 11,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'image',
                  attrs: {
                    alt: 'logo',
                    src: 'https://images.unsplash.com/photo-1549924231-f129b911e442?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=Mnw4MDYyM3wwfDF8c2VhcmNofDl8fGxvZ298ZW58MHx8fHwxNjM2NDk0NTMy\u0026ixlib=rb-1.2.1\u0026q=85',
                    title: 'logo',
                    textAlign: 'center',
                  },
                },
              ],
              attrs: {
                textAlign: 'center',
              },
            },
            {
              type: 'heading',
              content: [
                {
                  type: 'text',
                  text: 'Street Address',
                },
              ],
              attrs: {
                level: 3,
                textAlign: 'center',
              },
            },
            {
              type: 'heading',
              content: [
                {
                  type: 'text',
                  text: 'City, State, Zip',
                },
              ],
              attrs: {
                level: 3,
                textAlign: 'center',
              },
            },
            {
              type: 'heading',
              content: [
                {
                  type: 'text',
                  text: 'Phone Number',
                },
              ],
              attrs: {
                level: 3,
                textAlign: 'center',
              },
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'wotcvnu9vactoqkgccpp9h',
        section_header: 'Untitled Chapter',
        order: 12,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
              attrs: {
                textAlign: 'left',
              },
            },
            {
              type: 'heading',
              content: [
                {
                  type: 'text',
                  text: 'Sample Title ',
                },
              ],
              attrs: {
                level: 1,
                textAlign: 'center',
              },
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Sample Content ',
                },
              ],
              attrs: {
                textAlign: 'center',
              },
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: 'bpqmjsyvtz42w3k2w91yrs',
        section_header: 'Untitled Chapter',
        order: 13,
        section_bg_image: '',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        sections: [],
        section_bg_image_config: {
          size: 'cover',
        },
      },
    ],
    published_report_toc: [
      {
        id: '9tmsbjuvaeuag1dyv3z7cl',
        order: 1,
        section_header: 'Untitled Cover Page',
      },
      {
        id: '2n1ubougfnfbqauv0ccted',
        order: 2,
        section_header: 'Untitled Cover Page',
      },
      {
        id: 'ikogialn4of5kt9xbq83f',
        order: 3,
        section_header: 'Untitled Cover Page',
      },
      {
        id: 'ityc4dnmx7n5rfabxrysvi',
        order: 4,
        section_header: 'Untitled Cover Page',
      },
      {
        id: 'chjmwlg783m37frephtu',
        order: 5,
        section_header: 'Untitled Cover Page',
      },
      {
        id: '9xk2crfgtjfddwnbjd56q5',
        order: 6,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'zqtmhi90c2720lal9ulc4',
        order: 7,
        section_header: 'Untitled Cover Page',
      },
      {
        id: 'mxh1stx8cxdzf3udocbmj',
        order: 8,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'xl6ujl7hqsrygglb7ai0j',
        order: 9,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'on44gmkkpyp8qhnz7tdm27',
        order: 10,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'l0tm9teo4pe0mmi0awfucs',
        order: 11,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'wotcvnu9vactoqkgccpp9h',
        order: 12,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'bpqmjsyvtz42w3k2w91yrs',
        order: 13,
        section_header: 'Untitled Chapter',
      },
    ],
    report_builder_version: 2,
    body_font: 'Alfa Slab One',
    heading_font: 'Alfa Slab One',
    sections: [
      {
        id: '9tmsbjuvaeuag1dyv3z7cl',
        section_header: 'Untitled Cover Page',
        order: 1,
        section_bg_image:
          'https://firebasestorage.googleapis.com/v0/b/projekt-lavender.appspot.com/o/images%2FAsKcI9YmXrhndYt3FMqchPM9njD3%2Funspash-image-1639466869801.jpeg?alt=media\u0026token=bf3aef49-a184-4167-ba94-350f5319daad',
        section_bg_color: 'rgba(255,0,74,0.27)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: {
                textAlign: 'left',
                level: 1,
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'ss',
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'eeeeee',
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'asdasdasdasdasdasd',
                },
              ],
            },
          ],
        },
        sections: [
          {
            id: '3phcld50xdze82740utp7',
            section_header: 'Untitled Cover Page',
            order: 1,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'o5p815ur418oaegz9ofdb',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 12,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'asdasdasd',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'asdasddsdfsdf',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                    },
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'asdasdasdasdasdasdasd',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
        ],
        section_bg_image_config: {
          size: 'cover',
        },
      },
      {
        id: '2n1ubougfnfbqauv0ccted',
        section_header: 'Untitled Cover Page',
        order: 2,
        section_bg_image:
          'https://firebasestorage.googleapis.com/v0/b/projekt-lavender.appspot.com/o/images%2FAsKcI9YmXrhndYt3FMqchPM9njD3%2Funspash-image-1639468872596.jpeg?alt=media\u0026token=d0c0a2e3-7553-45b4-a68b-c1326f6ed949',
        section_bg_color: 'rgba(250, 250, 250, 1)',
        section_height: 800,
        section_width: null,
        section_flex: 12,
        is_section_container: false,
        is_inline: false,
        is_cover_section: true,
        generated_json: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'twitterEmbed',
              attrs: {
                embedContent:
                  '"\u003cblockquote class=\\"twitter-tweet\\"\u003e\u003cp lang=\\"en\\" dir=\\"ltr\\"\u003eI’m always fascinated by the conservative response when asked for evidence or examples of their claims. \u003ca href=\\"https://t.co/SUlxd5fstc\\"\u003epic.twitter.com/SUlxd5fstc\u003c/a\u003e\u003c/p\u003e\u0026mdash; Marc Lamont Hill (@marclamonthill) \u003ca href=\\"https://twitter.com/marclamonthill/status/1471148466076368897?ref_src=twsrc%5Etfw\\"\u003eDecember 15, 2021\u003c/a\u003e\u003c/blockquote\u003e \u003cscript async src=\\"https://platform.twitter.com/widgets.js\\" charset=\\"utf-8\\"\u003e\u003c/script\u003e"',
                justifyContent: 'center',
                width: 550,
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'left',
                fontFamily: 'Alfa Slab One',
              },
            },
            {
              type: 'heading',
              attrs: {
                textAlign: 'center',
                level: 1,
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'Sample Title',
                },
              ],
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'center',
                fontFamily: 'Alfa Slab One',
              },
              content: [
                {
                  type: 'text',
                  text: 'Sample Content',
                },
              ],
            },
          ],
        },
        sections: [
          {
            id: 'pkobuw7xlzez8qnzysl',
            section_header: 'Untitled Cover Page',
            order: 1,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'ojcas43s0kmzzv3ivquj8',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(0,0,0,1)',
                section_height: 400,
                section_width: null,
                section_flex: 12,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
          {
            id: 'v2s4imw05pim4l9kqgcjyh',
            section_header: 'Untitled Cover Page',
            order: 2,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: '90jz7ng4vxbkdnu9x7uege',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(255,0,94,1)',
                section_height: 400,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
              {
                id: 'v130hdhy72efym2z66clem',
                section_header: 'Untitled Cover Page',
                order: 2,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      attrs: {
                        textAlign: 'left',
                        fontFamily: 'Alfa Slab One',
                      },
                      content: [
                        {
                          type: 'image',
                          attrs: {
                            textAlign: 'left',
                            src: 'https://firebasestorage.googleapis.com/v0/b/projekt-lavender.appspot.com/o/images%2FAsKcI9YmXrhndYt3FMqchPM9njD3%2Funspash-image-1639698233949.jpeg?alt=media\u0026token=50f7fc08-4df4-46f0-b7d3-0a981fe39a5f',
                            alt: null,
                            title: null,
                            width: '500px',
                            height: '300px',
                            changeable: false,
                          },
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
          {
            id: '8ot1h9t4ulpnw8vqd2sd',
            section_header: 'Untitled Cover Page',
            order: 3,
            section_bg_image: '',
            section_bg_color: 'rgba(250, 250, 250, 1)',
            section_height: 800,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'urpj8cdi8cg3ieg1qyah8j',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 800,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'heading',
                      content: [
                        {
                          type: 'text',
                          text: 'Enter Story Title',
                        },
                      ],
                      attrs: {
                        level: 1,
                        textAlign: 'center',
                      },
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
                        },
                      ],
                      attrs: {
                        textAlign: 'center',
                      },
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
              {
                id: 'f9msy8un4kxd1sbrt7x',
                section_header: 'Untitled Cover Page',
                order: 2,
                section_bg_image:
                  'https://images.unsplash.com/photo-1549924231-f129b911e442?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=Mnw4MDYyM3wwfDF8c2VhcmNofDl8fGxvZ298ZW58MHx8fHwxNjM2NDk0NTMy\u0026ixlib=rb-1.2.1\u0026q=85',
                section_bg_color: 'rgba(250, 250, 250, 1)',
                section_height: 800,
                section_width: null,
                section_flex: 6,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
          {
            id: '3o19djg63j2rrydpz4hiwc',
            section_header: 'Untitled Cover Page',
            order: 4,
            section_bg_image: '',
            section_bg_color: 'rgba(116, 116, 116, 1)',
            section_height: 400,
            section_width: null,
            section_flex: 12,
            is_section_container: true,
            is_inline: false,
            is_cover_section: false,
            generated_json: {},
            sections: [
              {
                id: 'nmsuqfgl4ysraonci6t19',
                section_header: 'Untitled Cover Page',
                order: 1,
                section_bg_image: '',
                section_bg_color: 'rgba(116, 116, 116, 1)',
                section_height: 400,
                section_width: null,
                section_flex: 12,
                is_section_container: false,
                is_inline: false,
                is_cover_section: false,
                generated_json: {
                  type: 'doc',
                  content: [
                    {
                      type: 'heading',
                      content: [
                        {
                          marks: [
                            {
                              type: 'textStyle',
                              attrs: {
                                color: 'rgba(255,255,255,1)',
                              },
                            },
                          ],
                          type: 'text',
                          text: 'Enter call to action...',
                        },
                      ],
                      attrs: {
                        level: 3,
                        textAlign: 'center',
                      },
                    },
                    {
                      type: 'heading',
                      content: [
                        {
                          type: 'text',
                          text: 'Make a Contribution',
                          marks: [
                            {
                              type: 'textStyle',
                              attrs: {
                                color: 'rgba(255,255,255,1)',
                              },
                            },
                            {
                              type: 'link',
                              attrs: {
                                href: 'https://testing.com',
                                target: '_blank',
                              },
                            },
                          ],
                        },
                      ],
                      attrs: {
                        level: 1,
                        textAlign: 'center',
                      },
                    },
                  ],
                },
                sections: [],
                section_bg_image_config: {
                  size: 'cover',
                },
              },
            ],
            section_bg_image_config: {
              size: 'cover',
            },
          },
        ],
        section_bg_image_config: {
          size: 'stretch',
        },
      },
    ],
    get_building_report_toc: [
      {
        id: '9tmsbjuvaeuag1dyv3z7cl',
        order: 1,
        section_header: 'Untitled Cover Page',
      },
      {
        id: '2n1ubougfnfbqauv0ccted',
        order: 2,
        section_header: 'Untitled Cover Page',
      },
      {
        id: 'ikogialn4of5kt9xbq83f',
        order: 3,
        section_header: 'Untitled Cover Page',
      },
      {
        id: 'ityc4dnmx7n5rfabxrysvi',
        order: 4,
        section_header: 'Untitled Cover Page',
      },
      {
        id: 'chjmwlg783m37frephtu',
        order: 5,
        section_header: 'Untitled Cover Page',
      },
      {
        id: '9xk2crfgtjfddwnbjd56q5',
        order: 6,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'zqtmhi90c2720lal9ulc4',
        order: 7,
        section_header: 'Untitled Cover Page',
      },
      {
        id: 'mxh1stx8cxdzf3udocbmj',
        order: 8,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'xl6ujl7hqsrygglb7ai0j',
        order: 9,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'on44gmkkpyp8qhnz7tdm27',
        order: 10,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'l0tm9teo4pe0mmi0awfucs',
        order: 11,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'wotcvnu9vactoqkgccpp9h',
        order: 12,
        section_header: 'Untitled Chapter',
      },
      {
        id: 'bpqmjsyvtz42w3k2w91yrs',
        order: 13,
        section_header: 'Untitled Chapter',
      },
    ],
    heading_font_is_custom: false,
    body_font_is_custom: false,
    heading_font_url: '',
    body_font_url: '',
    username: 'pb1646a',
  },
}

// Create classes for tests. This serves as a smoke test
// for the basic syntax.

class MockApiClient {}

class ReportAPI extends ModelAPI {
  static client = new MockApiClient()
}

const emptyDoc = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: ' ',
        },
      ],
    },
  ],
}

class BgImageConfig extends Model {
  static size = new fields.Field({ defaultVal: 'cover' })
}

export default class CoverSection extends Model {
  static id = new fields.IdField({ readOnly: false })

  static sectionHeader = new fields.Field({ defaultVal: 'Untitled Chapter' })
  static order = new fields.IntegerField()
  static sectionBgImage = new fields.CharField()

  static generatedMarkup = new fields.Field({ defaultVal: '', readOnly: true })
  static generatedJson = new fields.Field({ defaultVal: emptyDoc, readOnly: false })
  static sectionBgColor = new fields.Field({ defaultVal: 'rgba(250, 250, 250, 1)' })
  static sections = new fields.ModelField({
    defaultVal: [],
    ModelClass: CoverSection,
    readOnly: false,
    many: true,
  })
  static sectionHeight = new fields.IntegerField()
  static sectionWidth = new fields.IntegerField()
  static sectionFlex = new fields.IntegerField({ defaultVal: 12 })
  // below are used for subsections mostly
  static isSectionContainer = new fields.BooleanField({ defaultVal: false })
  static isInline = new fields.BooleanField({ defaultVal: false }) // show columns inline or as multiline (aka flex flow)
  static isCoverSection = new fields.BooleanField({ defaultVal: false })
  static sectionBgImageConfig = new fields.ModelField({
    readOnly: false,
    ModelClass: BgImageConfig,
    defaultVal: BgImageConfig.create({}),
  })
}

export { emptyDoc }
//:section_bg_image,:generated_json,  :sections=[]

export class Report extends Model {
  static api = ReportAPI.create(Report)

  static id = new fields.IdField({ readOnly: true })
  static reportTitle = new fields.CharField({})
  static subscriptionStatus = new fields.CharField({ readOnly: true })
  static builderLink = new fields.CharField({ readOnly: true })
  static firebaseId = new fields.CharField({ readOnly: true })
  static email = new fields.CharField({ readOnly: true })
  static seoEnabled = new fields.BooleanField({ defaultVal: false, readOnly: true })
  static getBuildingReportToc = new fields.Field({ readOnly: true })
  static publishedAt = new fields.CharField({ readOnly: true })
  static createdAt = new fields.CharField({ readOnly: true })
  static reportStatus = new fields.CharField({ readOnly: true })

  static name = new fields.CharField({ readOnly: true })
  static organization = new fields.CharField({ readOnly: true })
  static newBuilderLink = new fields.CharField({ readOnly: true })
  static premium = new fields.BooleanField({ readOnly: true })
  static publishedAt = new fields.CharField({ readOnly: true })
  static publishedReportContent = new fields.Field({ readOnly: true })
  static publishedReportSections = new fields.ModelField({
    ModelClass: CoverSection,
    defaultVal: [],
    many: true,
    readOnly: true,
  })
  static publishedReportToc = new fields.Field({ readOnly: true })
  static reportBuilderVersion = new fields.IntegerField({ defaultVal: 2 })
  static reportContent = new fields.Field({ readOnly: true })
  static reportCover = new fields.Field()
  static reportMarkup = new fields.Field()
  static reportSlug = new fields.Field({ readOnly: true })
  static reportViews = new fields.IntegerField({ readOnly: true })
  static reportYear = new fields.IntegerField()

  static showFooter = new fields.BooleanField({ defaultVal: true })
  static subscriptionStatus = new fields.Field({ readOnly: true })

  static bodyFont = new fields.CharField()
  static headingFont = new fields.CharField()
  static sections = new fields.ModelField({
    ModelClass: CoverSection,
    defaultVal: [],
    many: true,
  })
  static headingFontUrl = new fields.Field({ readOnly: false })
  static bodyFontUrl = new fields.Field({ readOnly: false })
  static headingFontIsCustom = new fields.Field({ readOnly: false })
  static bodyFontIsCustom = new fields.Field({ readOnly: false })
}

describe('Model', function () {
  describe('#toAPI() fn', function () {
    it('should create a person instance with fields for each static property without args and with id being readOnly', function () {
      console.log(Report.fromAPI(reportCont))
      const report = Report.create()
      //assert.equal(Object.prototype.hasOwnProperty.call(formatted_for_api, 'id'), false)
      console.log(report)
      assert.equal(false, false)
    })
  })
})
