#!/usr/bin/env python
# -*- coding: utf-8 -*-
import qrcode
import json
from os import path

PATH = './assets/img/team/qr/'
COMPANY = 'SYNAPTIC'
ADDRESS = 'Av. Mariano Sánchez Fontecilla #368'


def generate_qr(name_file, data):
    qr = qrcode.QRCode(
        # version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        # box_size=10,
        # border=4,
    )
    # Add data
    qr.add_data("""BEGIN:VCARD
VERSION:4.0
N:{name}
ORG:{company}
TEL;TYPE=WORK:{office_phone}
TEL;TYPE=HOME:{personal_phone}
EMAIL;TYPE=PREF,INTERNET:{email}
ADR;TYPE=WORK:{address}
END:VCARD""".format(**data))
    qr.make(fit=True)

    # Create an image from the QR Code instance
    img = qr.make_image()
    img.save(path.join(PATH, name_file))


def run():
    file = open('./team.json', 'r').read()
    # Get list of teams
    try:
        team = json.loads(file)
    except Exception as e:
        raise e

    for person in team:
        print('√ %s' % person.get('name'))
        generate_qr(
            "%s.png" % person['id'],
            {
                'name': person.get('name', ''),
                'company': COMPANY,
                'office_phone': person.get('office_phone', ''),
                'personal_phone': person.get('personal_phone', ''),
                'email': person.get('email', ''),
                'address': ADDRESS
            }
        )
    print('Saved in %s' % PATH)

if __name__ == '__main__':
    run()
