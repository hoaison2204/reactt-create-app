const RELATIONSHIP_AVAILABLES = [
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '0',
    relationshipName: '本人',
    relationshipLevel: '0',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '11',
    relationshipName: '父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '12',
    relationshipName: '母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '13',
    relationshipName: '祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '14',
    relationshipName: '祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '15',
    relationshipName: '曾祖父',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '16',
    relationshipName: '曾祖母',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '17',
    relationshipName: '養父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '18',
    relationshipName: '養母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '21',
    relationshipName: '妻',
    relationshipLevel: '0',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '22',
    relationshipName: '夫',
    relationshipLevel: '0',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '31',
    relationshipName: '長男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '32',
    relationshipName: '二男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '33',
    relationshipName: '三男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '34',
    relationshipName: '四男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '35',
    relationshipName: '五男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '36',
    relationshipName: '六男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '37',
    relationshipName: '七男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '38',
    relationshipName: '養子',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '41',
    relationshipName: '長女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '42',
    relationshipName: '二女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '43',
    relationshipName: '三女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '44',
    relationshipName: '四女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '45',
    relationshipName: '五女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '46',
    relationshipName: '六女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '47',
    relationshipName: '七女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '48',
    relationshipName: '養女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '51',
    relationshipName: '義父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '52',
    relationshipName: '兄',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '53',
    relationshipName: '弟',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '54',
    relationshipName: '孫',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '55',
    relationshipName: '叔父',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '56',
    relationshipName: '甥',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '57',
    relationshipName: '義祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '58',
    relationshipName: '養祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '61',
    relationshipName: '義母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '62',
    relationshipName: '姉',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '63',
    relationshipName: '妹',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '64',
    relationshipName: '孫',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '65',
    relationshipName: '叔母',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '66',
    relationshipName: '姪',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '67',
    relationshipName: '義祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '68',
    relationshipName: '養祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '71',
    relationshipName: '義兄',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '72',
    relationshipName: '義弟',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '73',
    relationshipName: '義姉',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '74',
    relationshipName: '義妹',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '301',
    relationshipName: 'その他1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '302',
    relationshipName: 'その他2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '303',
    relationshipName: 'その他3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '304',
    relationshipName: 'その他4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '305',
    relationshipName: 'その他5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '306',
    relationshipName: 'その他6',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '307',
    relationshipName: 'その他7',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '308',
    relationshipName: 'その他8',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '309',
    relationshipName: 'その他9',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '310',
    relationshipName: 'その他10',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '229',
    relationshipName: 'ビジター1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '230',
    relationshipName: 'ビジター2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '231',
    relationshipName: 'ビジター3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '232',
    relationshipName: 'ビジター4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '233',
    relationshipName: 'ビジター5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '234',
    relationshipName: 'ビジター6',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '235',
    relationshipName: 'ビジター7',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '236',
    relationshipName: 'ビジター8',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '237',
    relationshipName: 'ビジター9',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '20',
    groupName: '万有用',
    relationshipId: '238',
    relationshipName: 'ビジター10',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '0',
    relationshipName: '本人',
    relationshipLevel: '0',
    genderDistinction: '30'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '11',
    relationshipName: '父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '12',
    relationshipName: '母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '13',
    relationshipName: '祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '14',
    relationshipName: '祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '15',
    relationshipName: '曾祖父',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '16',
    relationshipName: '曾祖母',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '17',
    relationshipName: '養父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '18',
    relationshipName: '養母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '21',
    relationshipName: '妻',
    relationshipLevel: '0',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '22',
    relationshipName: '夫',
    relationshipLevel: '0',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '31',
    relationshipName: '長男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '32',
    relationshipName: '二男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '33',
    relationshipName: '三男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '34',
    relationshipName: '四男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '35',
    relationshipName: '五男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '36',
    relationshipName: '六男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '37',
    relationshipName: '七男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '38',
    relationshipName: '養子',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '39',
    relationshipName: '養子２',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '41',
    relationshipName: '長女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '42',
    relationshipName: '二女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '43',
    relationshipName: '三女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '44',
    relationshipName: '四女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '45',
    relationshipName: '五女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '46',
    relationshipName: '六女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '47',
    relationshipName: '七女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '48',
    relationshipName: '養女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '49',
    relationshipName: '養女２',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '51',
    relationshipName: '義父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '52',
    relationshipName: '兄',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '53',
    relationshipName: '弟',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '54',
    relationshipName: '孫',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '55',
    relationshipName: '叔父',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '56',
    relationshipName: '甥',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '57',
    relationshipName: '義祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '58',
    relationshipName: '養祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '61',
    relationshipName: '義母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '62',
    relationshipName: '姉',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '63',
    relationshipName: '妹',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '64',
    relationshipName: '孫',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '65',
    relationshipName: '叔母',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '66',
    relationshipName: '姪',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '67',
    relationshipName: '義祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '68',
    relationshipName: '養祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '71',
    relationshipName: '義兄',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '72',
    relationshipName: '義弟',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '73',
    relationshipName: '義姉',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '74',
    relationshipName: '義妹',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '75',
    relationshipName: '義子',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '80',
    relationshipName: 'その他',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '81',
    relationshipName: '兄弟１',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '82',
    relationshipName: '兄弟２',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '83',
    relationshipName: '兄弟３',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '84',
    relationshipName: '兄弟４',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '85',
    relationshipName: '兄弟５',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '86',
    relationshipName: '兄弟６',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '87',
    relationshipName: '兄弟７',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '88',
    relationshipName: '兄弟８',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '89',
    relationshipName: '兄弟９',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '91',
    relationshipName: '姉妹１',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '92',
    relationshipName: '姉妹２',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '93',
    relationshipName: '姉妹３',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '94',
    relationshipName: '姉妹４',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '95',
    relationshipName: '姉妹５',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '96',
    relationshipName: '姉妹６',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '97',
    relationshipName: '姉妹７',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '98',
    relationshipName: '姉妹８',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '99',
    relationshipName: '姉妹９',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '100',
    relationshipName: 'その他２',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '101',
    relationshipName: '子',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '102',
    relationshipName: '養女１',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '30',
    groupName: 'マック用',
    relationshipId: '103',
    relationshipName: '子２',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '0',
    relationshipName: '本人',
    relationshipLevel: '0',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '11',
    relationshipName: '父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '12',
    relationshipName: '母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '13',
    relationshipName: '祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '14',
    relationshipName: '祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '15',
    relationshipName: '曾祖父',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '16',
    relationshipName: '曾祖母',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '17',
    relationshipName: '養父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '18',
    relationshipName: '養母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '21',
    relationshipName: '妻',
    relationshipLevel: '0',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '22',
    relationshipName: '夫',
    relationshipLevel: '0',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '31',
    relationshipName: '長男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '32',
    relationshipName: '二男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '33',
    relationshipName: '三男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '34',
    relationshipName: '四男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '35',
    relationshipName: '五男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '36',
    relationshipName: '六男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '37',
    relationshipName: '七男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '38',
    relationshipName: '養子',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '41',
    relationshipName: '長女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '42',
    relationshipName: '二女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '43',
    relationshipName: '三女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '44',
    relationshipName: '四女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '45',
    relationshipName: '五女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '46',
    relationshipName: '六女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '47',
    relationshipName: '七女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '48',
    relationshipName: '養女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '51',
    relationshipName: '義父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '52',
    relationshipName: '兄',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '53',
    relationshipName: '弟',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '54',
    relationshipName: '孫',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '55',
    relationshipName: '叔父',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '56',
    relationshipName: '甥',
    relationshipLevel: '3',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '57',
    relationshipName: '義祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '58',
    relationshipName: '養祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '61',
    relationshipName: '義母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '62',
    relationshipName: '姉',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '63',
    relationshipName: '妹',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '64',
    relationshipName: '孫',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '65',
    relationshipName: '叔母',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '66',
    relationshipName: '姪',
    relationshipLevel: '3',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '67',
    relationshipName: '義祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '68',
    relationshipName: '養祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '71',
    relationshipName: '義兄',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '72',
    relationshipName: '義弟',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '73',
    relationshipName: '義姉',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '74',
    relationshipName: '義妹',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '75',
    relationshipName: '義子',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '80',
    relationshipName: 'その他',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '102',
    relationshipName: '養女１',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '229',
    relationshipName: 'ビジター1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '230',
    relationshipName: 'ビジター2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '231',
    relationshipName: 'ビジター3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '232',
    relationshipName: 'ビジター4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '233',
    relationshipName: 'ビジター5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '234',
    relationshipName: 'ビジター6',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '235',
    relationshipName: 'ビジター7',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '236',
    relationshipName: 'ビジター8',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '237',
    relationshipName: 'ビジター9',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '40',
    groupName: '電通用',
    relationshipId: '238',
    relationshipName: 'ビジター10',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '0',
    relationshipName: '本人',
    relationshipLevel: '0',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '21',
    relationshipName: '妻',
    relationshipLevel: '0',
    genderDistinction: '20'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '22',
    relationshipName: '夫',
    relationshipLevel: '0',
    genderDistinction: '10'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '31',
    relationshipName: '長男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '32',
    relationshipName: '二男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '33',
    relationshipName: '三男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '41',
    relationshipName: '長女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '42',
    relationshipName: '二女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '43',
    relationshipName: '三女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '11',
    relationshipName: '父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '12',
    relationshipName: '母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '51',
    relationshipName: '義父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '61',
    relationshipName: '義母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '210',
    relationshipName: '兄弟（姉妹）1',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '211',
    relationshipName: '兄弟（姉妹）2',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '212',
    relationshipName: '兄弟（姉妹）3',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '213',
    relationshipName: '兄弟（姉妹）4',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '214',
    relationshipName: '兄弟（姉妹）5',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '215',
    relationshipName: '兄弟（姉妹）6',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '216',
    relationshipName: '孫1',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '217',
    relationshipName: '孫2',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '218',
    relationshipName: '孫3',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '219',
    relationshipName: '2親等内親族1',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '220',
    relationshipName: '2親等内親族2',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '221',
    relationshipName: '2親等内親族3',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '222',
    relationshipName: '2親等内親族4',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '223',
    relationshipName: '2親等内親族5',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '224',
    relationshipName: '2親等内親族6',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '225',
    relationshipName: '2親等内親族7',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '226',
    relationshipName: '2親等内親族8',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '227',
    relationshipName: '2親等内親族9',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '228',
    relationshipName: '2親等内親族10',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '229',
    relationshipName: 'ビジター1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '230',
    relationshipName: 'ビジター2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '231',
    relationshipName: 'ビジター3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '232',
    relationshipName: 'ビジター4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '233',
    relationshipName: 'ビジター5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '234',
    relationshipName: 'ビジター6',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '235',
    relationshipName: 'ビジター7',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '236',
    relationshipName: 'ビジター8',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '237',
    relationshipName: 'ビジター9',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '238',
    relationshipName: 'ビジター10',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '50',
    groupName: '二親等用',
    relationshipId: '205',
    relationshipName: 'その他会員',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '0',
    relationshipName: '本人',
    relationshipLevel: '0',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '21',
    relationshipName: '妻',
    relationshipLevel: '0',
    genderDistinction: '20'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '22',
    relationshipName: '夫',
    relationshipLevel: '0',
    genderDistinction: '10'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '31',
    relationshipName: '長男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '32',
    relationshipName: '二男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '33',
    relationshipName: '三男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '41',
    relationshipName: '長女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '42',
    relationshipName: '二女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '43',
    relationshipName: '三女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '11',
    relationshipName: '父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '12',
    relationshipName: '母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '210',
    relationshipName: '兄弟（姉妹）1',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '211',
    relationshipName: '兄弟（姉妹）2',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '212',
    relationshipName: '兄弟（姉妹）3',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '213',
    relationshipName: '兄弟（姉妹）4',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '214',
    relationshipName: '兄弟（姉妹）5',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '215',
    relationshipName: '兄弟（姉妹）6',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '14',
    relationshipName: '祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '13',
    relationshipName: '祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '216',
    relationshipName: '孫1',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '217',
    relationshipName: '孫2',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '218',
    relationshipName: '孫3',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '239',
    relationshipName: '3親等内親族1',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '240',
    relationshipName: '3親等内親族2',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '241',
    relationshipName: '3親等内親族3',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '242',
    relationshipName: '3親等内親族4',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '243',
    relationshipName: '3親等内親族5',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '244',
    relationshipName: '3親等内親族6',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '245',
    relationshipName: '3親等内親族7',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '246',
    relationshipName: '3親等内親族8',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '247',
    relationshipName: '3親等内親族9',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '248',
    relationshipName: '3親等内親族10',
    relationshipLevel: '3',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '229',
    relationshipName: 'ビジター1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '230',
    relationshipName: 'ビジター2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '231',
    relationshipName: 'ビジター3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '232',
    relationshipName: 'ビジター4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '233',
    relationshipName: 'ビジター5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '234',
    relationshipName: 'ビジター6',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '235',
    relationshipName: 'ビジター7',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '236',
    relationshipName: 'ビジター8',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '237',
    relationshipName: 'ビジター9',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '238',
    relationshipName: 'ビジター10',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '60',
    groupName: '三親等用',
    relationshipId: '205',
    relationshipName: 'その他会員',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '0',
    relationshipName: '本人',
    relationshipLevel: '0',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '311',
    relationshipName: '被扶養者1',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '312',
    relationshipName: '被扶養者2',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '313',
    relationshipName: '被扶養者3',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '314',
    relationshipName: '被扶養者4',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '315',
    relationshipName: '被扶養者5',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '316',
    relationshipName: '被扶養者6',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '317',
    relationshipName: '被扶養者7',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '318',
    relationshipName: '被扶養者8',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '319',
    relationshipName: '被扶養者9',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '320',
    relationshipName: '被扶養者10',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '321',
    relationshipName: '被扶養者11',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '322',
    relationshipName: '被扶養者12',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '323',
    relationshipName: '被扶養者13',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '324',
    relationshipName: '被扶養者14',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '325',
    relationshipName: '被扶養者15',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '326',
    relationshipName: '他家族(ﾋﾞｼﾞﾀｰ)1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '327',
    relationshipName: '他家族(ﾋﾞｼﾞﾀｰ)2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '328',
    relationshipName: '他家族(ﾋﾞｼﾞﾀｰ)3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '329',
    relationshipName: '他家族(ﾋﾞｼﾞﾀｰ)4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '330',
    relationshipName: '他家族(ﾋﾞｼﾞﾀｰ)5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '331',
    relationshipName: '同僚/他企業会員1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '332',
    relationshipName: '同僚/他企業会員2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '333',
    relationshipName: '同僚/他企業会員3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '334',
    relationshipName: '同僚/他企業会員4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '335',
    relationshipName: '同僚/他企業会員5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '229',
    relationshipName: 'ビジター1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '230',
    relationshipName: 'ビジター2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '231',
    relationshipName: 'ビジター3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '232',
    relationshipName: 'ビジター4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '233',
    relationshipName: 'ビジター5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '234',
    relationshipName: 'ビジター6',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '235',
    relationshipName: 'ビジター7',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '236',
    relationshipName: 'ビジター8',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '237',
    relationshipName: 'ビジター9',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '70',
    groupName: '防衛省',
    relationshipId: '238',
    relationshipName: 'ビジター10',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '500',
    relationshipName: '本人',
    relationshipLevel: '0',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '511',
    relationshipName: '夫',
    relationshipLevel: '0',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '512',
    relationshipName: '妻',
    relationshipLevel: '0',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '521',
    relationshipName: '長男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '522',
    relationshipName: '次男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '523',
    relationshipName: '三男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '524',
    relationshipName: '四男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '525',
    relationshipName: '五男',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '526',
    relationshipName: '六男以降',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '531',
    relationshipName: '長女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '532',
    relationshipName: '次女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '533',
    relationshipName: '三女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '534',
    relationshipName: '四女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '535',
    relationshipName: '五女',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '536',
    relationshipName: '六女以降',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '540',
    relationshipName: '孫',
    relationshipLevel: '2',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '551',
    relationshipName: '父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '552',
    relationshipName: '母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '553',
    relationshipName: '義父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '554',
    relationshipName: '義母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '557',
    relationshipName: '養父',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '558',
    relationshipName: '養母',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '562',
    relationshipName: '祖父',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '563',
    relationshipName: '祖母',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '571',
    relationshipName: '兄',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '574',
    relationshipName: '弟',
    relationshipLevel: '2',
    genderDistinction: '10'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '581',
    relationshipName: '姉',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '584',
    relationshipName: '妹',
    relationshipLevel: '2',
    genderDistinction: '20'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '596',
    relationshipName: 'その他',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '599',
    relationshipName: '緊急時連絡者',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '229',
    relationshipName: 'ビジター1',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '230',
    relationshipName: 'ビジター2',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '231',
    relationshipName: 'ビジター3',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '232',
    relationshipName: 'ビジター4',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '233',
    relationshipName: 'ビジター5',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '234',
    relationshipName: 'ビジター6',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '235',
    relationshipName: 'ビジター7',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '236',
    relationshipName: 'ビジター8',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '237',
    relationshipName: 'ビジター9',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '80',
    groupName: '小学館',
    relationshipId: '238',
    relationshipName: 'ビジター10',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '0',
    relationshipName: '本人',
    relationshipLevel: '0',
    genderDistinction: '30'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '511',
    relationshipName: '被扶養者１',
    relationshipLevel: '0',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '512',
    relationshipName: '被扶養者2',
    relationshipLevel: '0',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '521',
    relationshipName: '被扶養者３',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '522',
    relationshipName: '被扶養者４',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '523',
    relationshipName: '被扶養者５',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '524',
    relationshipName: '被扶養者６',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '525',
    relationshipName: '被扶養者７',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '526',
    relationshipName: '被扶養者８',
    relationshipLevel: '1',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '531',
    relationshipName: '被扶養者９',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '532',
    relationshipName: '被扶養者１０',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '533',
    relationshipName: '被扶養者１１',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '534',
    relationshipName: '被扶養者１２',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '535',
    relationshipName: '被扶養者１３',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '536',
    relationshipName: '被扶養者１４',
    relationshipLevel: '1',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '540',
    relationshipName: '被扶養者１５',
    relationshipLevel: '1',
    genderDistinction: '30'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '551',
    relationshipName: 'その他1',
    relationshipLevel: '9',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '552',
    relationshipName: 'その他2',
    relationshipLevel: '9',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '553',
    relationshipName: 'その他3',
    relationshipLevel: '9',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '554',
    relationshipName: 'その他4',
    relationshipLevel: '9',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '557',
    relationshipName: 'その他5',
    relationshipLevel: '9',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '558',
    relationshipName: 'その他6',
    relationshipLevel: '9',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '562',
    relationshipName: 'その他7',
    relationshipLevel: '9',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '563',
    relationshipName: 'その他8',
    relationshipLevel: '9',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '571',
    relationshipName: 'その他9',
    relationshipLevel: '9',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '574',
    relationshipName: 'その他10',
    relationshipLevel: '9',
    genderDistinction: '10'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '581',
    relationshipName: 'その他11',
    relationshipLevel: '9',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '584',
    relationshipName: 'その他12',
    relationshipLevel: '9',
    genderDistinction: '20'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '596',
    relationshipName: 'その他13',
    relationshipLevel: '9',
    genderDistinction: '30'
  },
  {
    code: '90',
    groupName: '日本郵政G',
    relationshipId: '599',
    relationshipName: 'その他14',
    relationshipLevel: '9',
    genderDistinction: '30'
  }
]

export {
  RELATIONSHIP_AVAILABLES
}
