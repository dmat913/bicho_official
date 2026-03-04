const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ DB接続成功\n');

    // リーグ情報を確認
    const League = mongoose.model('League', new mongoose.Schema({}, { strict: false }));
    const leagues = await League.find();
    console.log('📊 リーグ情報:', leagues.length + '件');
    if (leagues.length > 0) {
      console.log(leagues);
    }

    // チーム情報を確認
    const LeagueTeam = mongoose.model('LeagueTeam', new mongoose.Schema({}, { strict: false }));
    const teams = await LeagueTeam.find();
    console.log('\n👥 チーム情報:', teams.length + '件');
    if (teams.length > 0) {
      console.log(teams);
    }

    // 試合結果を確認
    const MatchResult = mongoose.model('MatchResult', new mongoose.Schema({}, { strict: false }));
    const matches = await MatchResult.find();
    console.log('\n⚽ 試合結果:', matches.length + '件');
    if (matches.length > 0) {
      console.log(matches);
    }

    if (leagues.length === 0 && teams.length === 0 && matches.length === 0) {
      console.log('\n❌ データが登録されていません');
    }

  } catch (error) {
    console.error('❌ エラー:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkDB();
