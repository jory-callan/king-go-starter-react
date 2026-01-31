// mock-db-data.ts - 数据库执行器界面的模拟数据

// 数据库连接信息
export interface DatabaseConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  status: "connected" | "disconnected" | "connecting";
}

// 数据库信息
export interface DatabaseInfo {
  id: string;
  name: string;
  type: string; // mysql, postgresql, mongodb, etc.
  connectionId: string;
}

// 表信息
export interface TableInfo {
  id: string;
  name: string;
  databaseId: string;
  columns: ColumnInfo[];
  indexes: IndexInfo[];
  description?: string;
}

// 列信息
export interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string | null;
  primaryKey: boolean;
  unique: boolean;
  description?: string;
}

// 索引信息
export interface IndexInfo {
  name: string;
  columns: string[];
  unique: boolean;
  type: string; // INDEX, UNIQUE, PRIMARY
  description?: string;
}

// SQL执行历史记录
export interface SqlHistory {
  id: string;
  sql: string;
  databaseId: string;
  tableName?: string;
  executedAt: Date;
  executionTime: number; // 执行时间（毫秒）
  rowCount: number; // 返回行数
  success: boolean;
  errorMessage?: string;
}

// 收藏SQL
export interface FavoriteSql {
  id: string;
  name: string;
  sql: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 待审批SQL工单
export interface PendingApprovalSql {
  id: string;
  title: string;
  sql: string;
  description?: string;
  submitter: string;
  submittedAt: Date;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "approved" | "rejected";
  approvers: string[];
}

// 查询结果
export interface QueryResult {
  id: string;
  sql: string;
  columns: string[];
  rows: any[][];
  executionTime: number; // 执行时间（毫秒）
  rowCount: number; // 返回行数
  affectedRows?: number; // 影响行数（对于UPDATE, DELETE, INSERT等操作）
  error?: string;
}

// 模拟数据
export const mockConnections: DatabaseConnection[] = [
  {
    id: "conn1",
    name: "本地MySQL",
    host: "localhost",
    port: 3306,
    database: "test_db",
    username: "root",
    status: "connected"
  },
  {
    id: "conn2",
    name: "生产PostgreSQL",
    host: "prod.db.com",
    port: 5432,
    database: "main_db",
    username: "admin",
    status: "disconnected"
  }
];

export const mockDatabases: DatabaseInfo[] = [
  {
    id: "db1",
    name: "test_db",
    type: "mysql",
    connectionId: "conn1"
  },
  {
    id: "db2",
    name: "main_db",
    type: "postgresql",
    connectionId: "conn2"
  }
];

export const mockTables: TableInfo[] = [
  {
    id: "tbl1",
    name: "users",
    databaseId: "db1",
    columns: [
      { name: "id", type: "INT", nullable: false, defaultValue: null, primaryKey: true, unique: true, description: "用户ID" },
      { name: "username", type: "VARCHAR(50)", nullable: false, defaultValue: null, primaryKey: false, unique: true, description: "用户名" },
      { name: "email", type: "VARCHAR(100)", nullable: false, primaryKey: false, unique: true, description: "邮箱" },
      { name: "created_at", type: "TIMESTAMP", nullable: false, defaultValue: "CURRENT_TIMESTAMP", primaryKey: false, unique: false, description: "创建时间" }
    ],
    indexes: [
      { name: "PRIMARY", columns: ["id"], unique: true, type: "PRIMARY", description: "主键索引" },
      { name: "idx_username", columns: ["username"], unique: true, type: "INDEX", description: "用户名唯一索引" },
      { name: "idx_email", columns: ["email"], unique: true, type: "INDEX", description: "邮箱唯一索引" }
    ],
    description: "用户表"
  },
  {
    id: "tbl2",
    name: "orders",
    databaseId: "db1",
    columns: [
      { name: "id", type: "INT", nullable: false, defaultValue: null, primaryKey: true, unique: true, description: "订单ID" },
      { name: "user_id", type: "INT", nullable: false, primaryKey: false, unique: false, description: "用户ID" },
      { name: "product_name", type: "VARCHAR(200)", nullable: false, primaryKey: false, unique: false, description: "产品名称" },
      { name: "amount", type: "DECIMAL(10,2)", nullable: false, primaryKey: false, unique: false, description: "金额" },
      { name: "order_date", type: "TIMESTAMP", nullable: false, defaultValue: "CURRENT_TIMESTAMP", primaryKey: false, unique: false, description: "下单日期" }
    ],
    indexes: [
      { name: "PRIMARY", columns: ["id"], unique: true, type: "PRIMARY", description: "主键索引" },
      { name: "idx_user_id", columns: ["user_id"], unique: false, type: "INDEX", description: "用户ID索引" },
      { name: "idx_order_date", columns: ["order_date"], unique: false, type: "INDEX", description: "订单日期索引" }
    ],
    description: "订单表"
  }
];

export const mockHistory: SqlHistory[] = [
  {
    id: "hist1",
    sql: "SELECT * FROM users LIMIT 10;",
    databaseId: "db1",
    tableName: "users",
    executedAt: new Date(Date.now() - 3600000),
    executionTime: 12,
    rowCount: 10,
    success: true
  },
  {
    id: "hist2",
    sql: "SELECT COUNT(*) FROM orders;",
    databaseId: "db1",
    tableName: "orders",
    executedAt: new Date(Date.now() - 1800000),
    executionTime: 8,
    rowCount: 1,
    success: true
  },
  {
    id: "hist3",
    sql: "SELECT u.username, o.product_name FROM users u JOIN orders o ON u.id = o.user_id;",
    databaseId: "db1",
    tableName: "users,orders",
    executedAt: new Date(Date.now() - 600000),
    executionTime: 25,
    rowCount: 15,
    success: true
  }
];

export const mockFavorites: FavoriteSql[] = [
  {
    id: "fav1",
    name: "获取最近一周订单",
    sql: `SELECT 
  id, 
  user_id, 
  product_name, 
  amount, 
  order_date 
FROM orders 
WHERE order_date >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
ORDER BY order_date DESC;`,
    description: "查询最近一周的订单记录",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "fav2",
    name: "活跃用户统计",
    sql: `SELECT 
  u.username,
  u.email,
  COUNT(o.id) as order_count,
  SUM(o.amount) as total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING order_count > 0
ORDER BY total_amount DESC;`,
    description: "统计有订单的活跃用户",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-20")
  }
];

export const mockPendingApprovals: PendingApprovalSql[] = [
  {
    id: "app1",
    title: "删除测试用户",
    sql: "DELETE FROM users WHERE created_at < '2023-01-01' AND username LIKE 'test_%';",
    description: "清理2023年以前的测试账户",
    submitter: "张三",
    submittedAt: new Date("2024-01-20"),
    priority: "medium",
    status: "pending",
    approvers: ["李四", "王五"]
  },
  {
    id: "app2",
    title: "添加订单状态字段",
    sql: "ALTER TABLE orders ADD COLUMN status VARCHAR(20) DEFAULT 'pending';",
    description: "为订单表添加状态字段",
    submitter: "李四",
    submittedAt: new Date("2024-01-22"),
    priority: "high",
    status: "pending",
    approvers: ["王五", "赵六"]
  }
];

export const mockQueryResults: QueryResult[] = [
  {
    id: "result1",
    sql: "SELECT * FROM users LIMIT 5;",
    columns: ["id", "username", "email", "created_at"],
    rows: [
      [1, "john_doe", "john@example.com", "2024-01-15 10:30:00"],
      [2, "jane_smith", "jane@example.com", "2024-01-16 14:22:10"],
      [3, "bob_johnson", "bob@example.com", "2024-01-17 09:15:30"],
      [4, "alice_williams", "alice@example.com", "2024-01-18 16:45:22"],
      [5, "charlie_brown", "charlie@example.com", "2024-01-19 11:20:15"]
    ],
    executionTime: 15,
    rowCount: 5
  }
];

