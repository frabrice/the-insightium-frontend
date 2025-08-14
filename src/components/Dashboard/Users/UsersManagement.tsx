import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  MoreHorizontal,
  Calendar,
  User,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Mail,
  Phone,
  MapPin,
  UserCheck,
  UserX
} from 'lucide-react';

interface UsersManagementProps {
  isDarkMode: boolean;
}

export default function UsersManagement({ isDarkMode }: UsersManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const users = [
    {
      id: '1',
      fullName: 'Admin User',
      email: 'admin@theinsightium.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-03-15T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      bio: 'System Administrator',
      articlesCount: 0,
      avatar: null
    },
    {
      id: '2',
      fullName: 'Dr. Amara Okafor',
      email: 'amara.okafor@university.ac.za',
      role: 'author',
      status: 'active',
      lastLogin: '2024-03-14T15:45:00Z',
      createdAt: '2024-02-15T00:00:00Z',
      bio: 'Education Technology Researcher at University of Cape Town',
      articlesCount: 5,
      avatar: null
    },
    {
      id: '3',
      fullName: 'Sarah Mwangi',
      email: 'sarah.mwangi@policy.org',
      role: 'author',
      status: 'active',
      lastLogin: '2024-03-13T09:20:00Z',
      createdAt: '2024-02-20T00:00:00Z',
      bio: 'Gender & Education Policy Analyst',
      articlesCount: 3,
      avatar: null
    },
    {
      id: '4',
      fullName: 'Prof. Kwame Asante',
      email: 'kwame.asante@university.edu.gh',
      role: 'editor',
      status: 'active',
      lastLogin: '2024-03-12T14:10:00Z',
      createdAt: '2024-01-15T00:00:00Z',
      bio: 'Educational Researcher and Pedagogical Innovator',
      articlesCount: 8,
      avatar: null
    },
    {
      id: '5',
      fullName: 'Dr. Kemi Adebayo',
      email: 'kemi.adebayo@research.ng',
      role: 'author',
      status: 'inactive',
      lastLogin: '2024-02-28T11:30:00Z',
      createdAt: '2024-02-01T00:00:00Z',
      bio: 'Digital Inclusion Researcher',
      articlesCount: 2,
      avatar: null
    },
    {
      id: '6',
      fullName: 'James Mwangi',
      email: 'james.mwangi@tech.ke',
      role: 'author',
      status: 'active',
      lastLogin: '2024-03-11T16:45:00Z',
      createdAt: '2024-02-10T00:00:00Z',
      bio: 'Technology Journalist and EdTech Analyst',
      articlesCount: 4,
      avatar: null
    }
  ];

  const roles = ['admin', 'editor', 'author'];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-3 h-3" />;
      case 'editor': return <Edit className="w-3 h-3" />;
      case 'author': return <User className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'editor': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'author': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />;
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchQuery || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Users Management
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1">
          <Plus className="w-3 h-3" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Users
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {users.length}
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-lg">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Active Users
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-lg">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Authors
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {users.filter(u => u.role === 'author').length}
              </p>
            </div>
            <div className="bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-lg">
              <Edit className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Admins
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-2 rounded-lg">
              <Shield className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-7 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex items-start space-x-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.fullName}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </span>
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                          {getStatusIcon(user.status)}
                          <span className="capitalize">{user.status}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.email}
                        </span>
                      </div>
                      {user.bio && (
                        <p className={`text-xs mt-1 line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.bio}
                        </p>
                      )}
                    </div>

                    {/* User Stats */}
                    <div className="flex items-center space-x-4 ml-4">
                      <div className="text-right">
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.articlesCount}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          articles
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {formatLastLogin(user.lastLogin)}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          last login
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          joined
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1">
                        <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Edit className="w-3 h-3" />
                        </button>
                        <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <MoreHorizontal className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}