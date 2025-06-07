  return (
    <div className={`glass-effect rounded-2xl p-6 fade-in ${
      isDark ? 'bg-gray-800/50' : ''
    }`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${
              isDark ? 'bg-gray-700/50' : 'bg-white/50'
            }`}>
              <span className="text-2xl">{categoryEmoji}</span>
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h3>
              <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-lg text-base font-medium ${
              isDark ? 'bg-gray-700/50 text-white' : 'bg-white/50 text-gray-700'
            }`}>
              {statusEmoji} {status}
            </span>
            <span className={`px-4 py-2 rounded-lg text-base font-medium ${
              isDark ? 'bg-gray-700/50 text-white' : 'bg-white/50 text-gray-700'
            }`}>
              {priorityEmoji} {priority}
            </span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-lg text-base font-medium ${
                  isDark ? 'bg-gray-700/50 text-white' : 'bg-white/50 text-gray-700'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={handleVote}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium ${
                isDark 
                  ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' 
                  : 'bg-white/50 text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <ThumbsUp className={`w-5 h-5 ${hasVoted ? 'text-purple-500' : ''}`} />
              <span>{votes} votes</span>
            </button>
            <span className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {formatDate(createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium ${
                isDark 
                  ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' 
                  : 'bg-white/50 text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <Edit className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium ${
                isDark 
                  ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' 
                  : 'bg-white/50 text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ); 