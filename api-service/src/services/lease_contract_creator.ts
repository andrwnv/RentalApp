import PDFDocument from 'pdfkit';
import * as fs from 'fs';

const createLease = (client: any, object: any, fileName: string): string => {
    const pdfLease = new PDFDocument({
        size: [620, 877],
        margins: {
            top: 30,
            bottom: 30,
            left: 60,
            right: 30
        }
    });

    pdfLease.registerFont('Roboto', __dirname + '\\fonts\\Roboto-Regular.ttf')

    const filepath = __dirname + `\\tmp_files\\${fileName}.pdf`;
    const fileContent = 'Rental APP lease';

    fs.writeFile(filepath, fileContent, (_) => {
        console.log('The file was successfully saved!');
    });

    const stream = fs.createWriteStream(filepath, 'utf-8');
    pdfLease.pipe(stream);

    const currDate = new Date();

    pdfLease.font('Roboto')
            .fontSize(10)
            .text('ДОГОВОР АРЕНДЫ ЖИЛОГО ПОМЕЩЕНИЯ\n\n', {
                align: 'center'
            });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`"_______" __________________________ ${currDate.getFullYear()}г.\n\n`, {
                align: 'right'
            });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`Собственник жилья, (Ф.И.О.,   паспортные   данные): ${object.get('client').firstName} ${object.get('client').lastName} _______________________________________________________________________   именуемый   в   дальнейшем "Арендодатель", с одной стороны и  (Ф.И.О., паспортные данные): ${client.firstName} ${client.lastName} _______________________________________________________________________,  именуемый в дальнейшем "Арендатор", с другой стороны, заключили настоящий договор о нижеследующем:`,
                {
                    align: 'left'
                });

    // point 1.
    pdfLease.font('Roboto')
            .fontSize(10)
            .text('\n1. Предмет договора\n', {
                align: 'center'
            });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`1.1. Арендодатель представляет Арендатору и членам его семьи в пользование ${object.objectType.typeName} общей площадью______кв.м. по адресу: ${object.country.name}, ${object.localityType.name} ${object.locality.name}, ул. ${object.street.name} д. ${object.houseNumber}${object.buildingTowerNumber == null ? '' : `, ст. ${object.buildingTowerNumber}`}${object.apartmentNumber == null ? '' : `, кв. ${object.apartmentNumber}`}, характеристика которой приведена в акте сдачи ${object.objectType.typeName} (Приложение №1).`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text('1.2. Арендодатель передает в пользование Арендатору «Имущество», которое находится в Помещении, согласно Приложению №1 к настоящему Договору. Стороны подтверждают, что Имущество передается в исправном состоянии без явных повреждений.',
                {
                    align: 'left'
                });

    // point 2.
    pdfLease.font('Roboto')
            .fontSize(10)
            .text('\n2. Срок действия договора\n', {
                align: 'center'
            });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`2.1. Договор заключен на период с «____»_________________ ${currDate.getFullYear()}г. до «____»_________________ ${currDate.getFullYear()}г. и вступает в силу с момента его подписания обеими сторонами.`,
                {
                    align: 'left'
                });

    // point 3.
    pdfLease.font('Roboto')
            .fontSize(10)
            .text('\n3. Обязанности сторон\n', {
                align: 'center'
            });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`3.1. Арендодатель обязуется: \n    3.1.1. Предоставить в аренду принадлежащее ему на праве собственности жилье в пригодном для проживания состоянии.`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`3.2. Арендатор обязуется:`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`    3.2.1. Своевременно производить оплату за аренду Помещения, соблюдать условия настоящего Договора в отношении полноты расчетов с Арендодателем.`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`    3.2.2. Своевременно производить оплату за местные, междугородние и международные переговоры, электроэнергию и другие услуги, касающиеся Помещения, в течение всего срока аренды.`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`    3.2.3. В случае нанесения повреждений Помещению или Имуществу, отремонтировать его или произвести замену на эквивалентное, либо возместить убытки.`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`    3.2.4. При несоблюдении правил пожарной безопасности, эксплуатации электрических, газовой и водопроводно-канализационной систем и при возникновении любого, связанного с этим ущерба, возместить убытки Арендодателю и/или третьим лицам (соседям).`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`    3.2.5. Своевременно оповещать Арендодателя обо всех неисправностях в Помещении. `,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`    3.2.6. По окончании срока действия или при расторжении настоящего Договора, освободить и сдать арендуемое Помещение и Имущество Арендодателю, согласно Приложению №1 к настоящему Договору, в технически исправном состоянии, с учетом естественного износа.`,
                {
                    align: 'left'
                });

    // point 4.
    pdfLease.font('Roboto')
            .fontSize(10)
            .text('\n4. Ответственность сторон\n', {
                align: 'center'
            });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`4.1. Ответственность Арендатора:`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`    4.1.1. Арендатор возмещает Арендодателю материальный ущерб, в т.ч. упущенную выгоду, причиненный в результате невыполнения обязанностей, предусмотренных в п. 3.2. договора.`,
                {
                    align: 'left'
                });

    // point 5.
    pdfLease.font('Roboto')
            .fontSize(10)
            .text('\n5. Арендная плата\n', {
                align: 'center'
            });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`5.1. Плата за арендуемое по настоящему Договору Помещение составляет ______________(_______________________________________________________________________) рублей. за ${10} сутки(-ок)`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`5.2. Плата за арендуемое по настоящему Договору Помещение предоставляется перед въездом в Помещение в полном объеме.`,
                {
                    align: 'left'
                });

    // end.
    pdfLease.font('Roboto')
            .fontSize(10)
            .text('\nРеквизиты и подписи сторон\n', {
                align: 'center'
            });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`АРЕНДОДАТЕЛЬ: ${object.get('client').firstName} ${object.get('client').lastName}`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`Паспорт:_____________________________________________________________________________________`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`Кем и когда выдан:____________________________________________________________________________`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`Зарегистрирован по адресу:_____________________________________________________________________`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`_________________________ / подпись /\n\n`,
                {
                    align: 'right'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`\nАРЕНДАТОР: ${client.firstName} ${client.lastName}`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`Паспорт:_____________________________________________________________________________________`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`Кем и когда выдан:____________________________________________________________________________`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`Зарегистрирован по адресу:_____________________________________________________________________`,
                {
                    align: 'left'
                });

    pdfLease.font('Roboto')
            .fontSize(10)
            .text(`_________________________ / подпись /\n\n`,
                {
                    align: 'right'
                });

    pdfLease.end();

    return filepath;
}

export default createLease;
