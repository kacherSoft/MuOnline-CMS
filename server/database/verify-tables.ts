import { executeQuery } from './mysql-connection-pool';

async function verifyTables() {
    const tablesToVerify = ['chat_messages', 'chat_images', 'user_sessions'];
    console.log('🔍 Verifying existence of MuCMS tables...');

    try {
        const existingTables: string[] = [];

        for (const table of tablesToVerify) {
            const results = await executeQuery<{ table_name: string }>(
                "SELECT table_name FROM information_schema.tables WHERE table_schema = 'muonline' AND table_name = ?",
                [table]
            );
            if (results.length > 0) {
                existingTables.push(table);
            }
        }

        console.log('   Found tables:', existingTables);

        const missingTables = tablesToVerify.filter(t => !existingTables.includes(t));

        if (missingTables.length === 0) {
            console.log('✅ All MuCMS tables exist.');
            process.exit(0);
        } else {
            console.error('❌ Missing tables:', missingTables);
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Table verification failed:', error);
        process.exit(1);
    }
}

verifyTables();
