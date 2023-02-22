import numeral from 'numeral';

export const Version = 1;
export const MajorVersion = 1;
export const MinorVersion = 9;
export const buildNumber = 56;
export const AppVersion = `${Version}.${MajorVersion}.${MinorVersion}.${numeral(buildNumber).format('0000')}`;

export const UpdateHistory = [
    {
        version: `1.1.9.0056`,
        update: {
            id: [
                '9.56 Tampilan mobile',
            ],
            gb: [
                '9.56 Mobile view',
            ]
        }
    },
    {
        version: `1.0.8.0054`,
        update: {
            id: [
                '8.54 Penambahan modul PNRGOV APIS export excel',
                '8.52 Penambahan modul PNRGOV APIS Monitoring',
                '8.50 Penambahan detail info manifest dan cekal di kapal laut',
                '8.48 Perbaikan form menu master tpi dan pengguna',
                '8.47 Penambahan menu master tpi',
                '8.46 Penambahan menu master kanwil dan kanim & perbaikan bugs user level head office',
            ],
            gb: [
                '8.54 Add new module PNRGOV APIS export excel',
                '8.52 Add new module PNRGOV APIS Monitoring',
                '8.50 Add info for manifest total and watchlist in vessel menu',
                '8.48 Fixing form master tpi dan users page',
                '8.47 Add master Page tpi',
                '8.46 Add master page kanwil and kanim & fixing bugs user level head office',

            ]
        }
    },
    {
        version: `1.1.7.0045`,
        update: {
            id: [
                '7.45 Penambahan halaman beranda',
                '7.43 Penambahan captcha pada halaman login',
                '7.42 Penambahan modul halaman pencarian',
                '7.41 Penambahan modul export manifest penumpang',
                '7.40 Pembaruan menu dan tampilan',
                '7.37 Pembaruan halaman pengaturan',
                '7.36 Penambahan halaman pantau',
            ],
            gb: [
                '7.45 Add landing page',
                '7.43 Add captcha in login page',
                '7.42 Add search page modul',
                '7.41 Add export passenger manifest ',
                '7.40 Update menu and display',
                '7.37 Update rules page',
                '7.36 Add watchlist page',
            ]
        }
    },
    {
        version: `1.1.6.0035`,
        update: {
            id: [
                '6.35 Penambahan pengaturan user pantauan',
                '6.34 Penambahan user level dan jadwal penerbangan berdasarkan station user tsb',
                '6.33 Update panel jadwal penerbangan',
                '6.32 Penambahan grafik bulanan',
                '6.30 Penambahan halaman warga masuk dan keluar',
            ],
            gb: [
                '6.35 Add rules watchlist passengers',
                '6.34 Add modul user leveling with station based on user',
                '6.33 Update flight schedule panel',
                '6.32 Monthly chart added',
                '6.30 Page inbound and outbound added',
            ]
        }
    },
    {
        version: `1.0.5.0029`,
        update: {
            id: [
                '5.29 Penambahan grafik di detil jadwal penerbangan',
                '5.26 Penambahan halaman warga',
                '5.25 Penambahan halaman daftar penumpang',
                '5.24 Penambahan halaman detil penumpang kapal laut',
                '5.23 Penambahan halaman proses antrian',
                '5.22 Penambahan halaman penerbangan domestik',
                '5.21 Penambahan halaman master penerbangan',
                '5.20 Perbaikan tampilan utk layar sempit',
                '5.18 Penambahan modul vessel',
            ],
            gb: [
                '5.29 Add chart in flight schedule detail',
                '5.26 Page citizen added',
                '5.25 Page passengers list added',
                '5.24 Page vessel passenger detail added',
                '5.23 Process queue page added',
                '5.22 Add domestic flight page',
                '5.21 Add flight master page',
                '5.20 Fixing display for narrow screen',
                '5.18 Add vessel modul',
            ]
        }
    },
    {
        version: `1.0.4.0017`,
        update: {
            id: [
                '4.17 Penambahan pencarian menu',
            ],
            gb: [
                '4.17 Search menu added',
            ]
        }
    },
    {
        version: `1.0.3.0016`,
        update: {
            id: [
                '3.16 Penggantian status pesan telex dengan simbol dan penambahan status penerbangan',
                '3.15 Penambahan kontrol halaman di komponen daftar',
                '3.14 Penambahan pesan error saat proses pesan telex',
                '3.13 Penambahan fitur salin telex',
                '3.12 Penambahan halaman detail penumpang',
                '3.9 Penambahan informasi umur, dan total penumpang di sebelah kode booking',
                '3.8 Penambahan informasi CRWLST di halaman jadwal penerbangan',
                '3.7 Tampilan penumpang di menu jadual penerbangan',
                '3.7 Ganti tampilan list menjadi table utk tampilan penumpang dan pnr'
            ],
            gb: [
                '3.16 Change status telex in with symbol and flight status added',
                '3.15 Add pagination on lists component',
                '3.14 Additional error message on telex detail',
                '3.13 Penambahan fitur salin telex',
                '3.12 Additional page passenger information',
                '3.9 Additional age information and total pax near pnr',
                '3.8 Additional info CRWLST in flight schedule page',
                '3.7 Preview passengers in flight schedule',
                '3.7 Change table view for passenger and pnr'
            ]
        }
    },
    {
        version: `1.0.2.0005`,
        update: {
            id: [
                'Perbaikan masalah daftar komponen, ditambah batas baris yang tampil'
            ],
            gb: [
                'Fixing bugs lists component, limit added'
            ]
        }
    },
    {
        version: `1.0.2.0004`,
        update: {
            id: [
                'Perbaikan masalah halaman table '
            ],
            gb: [
                'Fixing bugs table pagination'
            ]
        }
    },
    {
        version: `1.0.2.0003`,
        update: {
            id: [
                'Penambahan halaman telex masuk'
            ],
            gb: [
                'Add telex in page'
            ]
        }
    },
    {
        version: `1.0.1.0002`,
        update: {
            id: [
                'Penambahan halaman jadual penerbangan, kode booking'
            ],
            gb: [
                'Add flight schedule page, pnr'
            ]
        }
    },
    {
        version: `1.0.0.0000`,
        update: {
            id: [
                'Penambahan halaman jadual penerbangan',
                'Penambahan halaman detail jadual penerbangan'
            ],
            gb: [
                'Add flight schedule page',
                'Add flight schedule detail page'
            ]
        }
    },
]

export const getUpdateLogs = () => {
    if (UpdateHistory.length < 5) return UpdateHistory;
    const up = [];
    for (let uuu = 0; uuu < 5; uuu++) {
        const u = UpdateHistory[uuu];
        up.push(u);
    }
    return up;
}